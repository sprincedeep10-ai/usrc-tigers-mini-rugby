import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  isCloudinaryConfigured,
} from "@/config/cloudinary";
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export { isCloudinaryConfigured };

const FOLDER = "usrc-tigers/sections";
const MANIFEST_ID = "usrc-tigers/section-images-manifest";

interface CloudinaryUploadResult {
  secure_url: string;
  version: number;
}

async function uploadToCloudinary(
  body: Buffer,
  options: {
    resourceType: "image" | "raw";
    publicId: string;
    filename: string;
  }
): Promise<CloudinaryUploadResult> {
  const form = new FormData();
  form.append(
    "file",
    new Blob([new Uint8Array(body)]),
    options.filename
  );
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  form.append("public_id", options.publicId);

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
  };
}

function manifestUrl(): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/${MANIFEST_ID}`;
}

async function fetchManifestFromCloud(): Promise<SectionImageManifest | null> {
  if (!isCloudinaryConfigured()) return null;

  try {
    const res = await fetch(`${manifestUrl()}?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as SectionImageManifest;
  } catch {
    return null;
  }
}

async function saveManifest(manifest: SectionImageManifest): Promise<void> {
  const json = JSON.stringify(manifest, null, 2);
  await uploadToCloudinary(Buffer.from(json, "utf-8"), {
    resourceType: "raw",
    publicId: MANIFEST_ID,
    filename: "manifest.json",
  });
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const stored = await fetchManifestFromCloud();
  if (!stored) return buildDefaultManifest();
  return mergeManifests(buildDefaultManifest(), stored);
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
  const uploaded = await uploadToCloudinary(bytes, {
    resourceType: "image",
    publicId: `${FOLDER}/${key}`,
    filename: `${key}.jpg`,
  });

  const entry: SectionImageEntry = {
    url: uploaded.secure_url,
    updatedAt: uploaded.version,
  };

  const manifest = mergeManifests(await fetchSectionImageManifest(), {
    [key]: entry,
  });

  await saveManifest(manifest);

  return { entry, manifest };
}
