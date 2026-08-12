import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  isCloudinaryConfigured,
} from "@/config/cloudinary";
import { SECTION_IMAGE_PATHS, type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export { isCloudinaryConfigured };

const FOLDER = "usrc-tigers/sections";

interface CloudinaryUploadResult {
  secure_url: string;
  version: number;
  created_at?: string;
}

interface CloudinaryListResource {
  secure_url: string;
  version: number;
  created_at: string;
}

interface CloudinaryListResponse {
  resources?: CloudinaryListResource[];
}

function sectionTag(key: SectionImageKey): string {
  return `usrc-section-${key}`;
}

async function uploadToCloudinary(
  body: Buffer,
  options: {
    resourceType: "image" | "raw";
    publicId: string;
    filename: string;
    tags?: string;
  }
): Promise<CloudinaryUploadResult> {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(body)]), options.filename);
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  form.append("public_id", options.publicId);
  if (options.tags) {
    form.append("tags", options.tags);
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${options.resourceType}/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Cloudinary upload failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as CloudinaryUploadResult;
  return {
    secure_url: data.secure_url,
    version: data.version ?? Date.now(),
    created_at: data.created_at,
  };
}

async function fetchLatestForSection(
  key: SectionImageKey
): Promise<SectionImageEntry | null> {
  const tag = sectionTag(key);
  const listUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`;

  try {
    const res = await fetch(`${listUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;

    const data = (await res.json()) as CloudinaryListResponse;
    const resources = data.resources ?? [];
    if (resources.length === 0) return null;

    const latest = resources.reduce((best, item) =>
      new Date(item.created_at).getTime() > new Date(best.created_at).getTime()
        ? item
        : best
    );

    return {
      url: latest.secure_url,
      updatedAt: latest.version ?? new Date(latest.created_at).getTime(),
    };
  } catch {
    return null;
  }
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  if (!isCloudinaryConfigured()) return buildDefaultManifest();

  const keys = Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[];
  const entries = await Promise.all(
    keys.map(async (key) => [key, await fetchLatestForSection(key)] as const)
  );

  const fromCloud = Object.fromEntries(
    entries.filter(([, entry]) => entry != null)
  ) as SectionImageManifest;

  return mergeManifests(buildDefaultManifest(), fromCloud);
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not set up yet. Open src/config/cloudinary.ts, add your Cloud name and Upload preset from cloudinary.com (free), then push to GitHub once."
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();
  const uploaded = await uploadToCloudinary(bytes, {
    resourceType: "image",
    publicId: `${FOLDER}/${key}-${stamp}`,
    filename: `${key}.jpg`,
    tags: sectionTag(key),
  });

  const entry: SectionImageEntry = {
    url: uploaded.secure_url,
    updatedAt: uploaded.version ?? stamp,
  };

  const manifest = mergeManifests(await fetchSectionImageManifest(), {
    [key]: entry,
  });

  return { entry, manifest };
}
