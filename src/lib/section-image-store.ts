import { head, put } from "@vercel/blob";
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export type { SectionImageEntry, SectionImageManifest };

const MANIFEST_PATH = "section-images/manifest.json";

export function isBlobStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readManifestFromBlob(): Promise<SectionImageManifest | null> {
  try {
    const meta = await head(MANIFEST_PATH);
    const res = await fetch(`${meta.url}?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) return null;
    return (await res.json()) as SectionImageManifest;
  } catch {
    return null;
  }
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const defaults = buildDefaultManifest();

  if (!isBlobStorageConfigured()) {
    return defaults;
  }

  const stored = await readManifestFromBlob();
  if (!stored) return defaults;
  return mergeManifests(defaults, stored);
}

async function persistManifest(manifest: SectionImageManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

async function verifyImageUrl(url: string): Promise<void> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
      cache: "no-store",
    });
    if (res.ok) return;
    await new Promise((r) => setTimeout(r, 300 * attempt));
  }
  throw new Error("Uploaded image is not reachable yet");
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  if (!isBlobStorageConfigured()) {
    throw new Error(
      "Image storage is not set up. In the Vercel dashboard, open this project → Storage → Create Blob Store, then redeploy."
    );
  }

  const updatedAt = Date.now();
  const pathname = `section-images/${key}-${updatedAt}.jpg`;

  const uploaded = await put(pathname, file, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });

  const entry: SectionImageEntry = { url: uploaded.url, updatedAt };
  await verifyImageUrl(uploaded.url);

  for (let attempt = 0; attempt < 4; attempt++) {
    const current = await fetchSectionImageManifest();
    const manifest = mergeManifests(current, { [key]: entry });
    await persistManifest(manifest);

    const verified = await readManifestFromBlob();
    const saved = verified?.[key];
    if (saved && saved.updatedAt >= entry.updatedAt && saved.url === entry.url) {
      return { entry, manifest: mergeManifests(manifest, verified ?? {}) };
    }

    await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
  }

  const manifest = mergeManifests(await fetchSectionImageManifest(), { [key]: entry });
  return { entry, manifest };
}
