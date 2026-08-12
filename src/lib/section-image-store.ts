import { head, put } from "@vercel/blob";
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export type { SectionImageEntry, SectionImageManifest };

const MANIFEST_PATH = "section-images/manifest.json";

export function isBlobStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const defaults = buildDefaultManifest();

  if (!isBlobStorageConfigured()) {
    return defaults;
  }

  try {
    const meta = await head(MANIFEST_PATH);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return defaults;
    const stored = (await res.json()) as SectionImageManifest;
    return { ...defaults, ...stored };
  } catch {
    return defaults;
  }
}

async function persistManifest(manifest: SectionImageManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

async function verifyImageUrl(url: string): Promise<void> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) return;
    await new Promise((r) => setTimeout(r, 300 * attempt));
  }
  throw new Error("Uploaded image is not reachable yet");
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob
): Promise<SectionImageEntry> {
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

  const manifest = await fetchSectionImageManifest();
  manifest[key] = entry;
  await persistManifest(manifest);

  return entry;
}
