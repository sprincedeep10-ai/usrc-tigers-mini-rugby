import { v2 as cloudinary } from "cloudinary";
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

const FOLDER = "usrc-tigers/sections";
const MANIFEST_ID = "usrc-tigers/section-images-manifest";

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

async function fetchManifestFromCloud(): Promise<SectionImageManifest | null> {
  if (!isCloudinaryConfigured()) return null;

  configureCloudinary();
  const url = cloudinary.url(MANIFEST_ID, { resource_type: "raw", secure: true });

  try {
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SectionImageManifest;
  } catch {
    return null;
  }
}

async function saveManifest(manifest: SectionImageManifest): Promise<void> {
  configureCloudinary();
  const json = JSON.stringify(manifest, null, 2);
  const dataUri = `data:application/json;base64,${Buffer.from(json).toString("base64")}`;

  await cloudinary.uploader.upload(dataUri, {
    public_id: MANIFEST_ID,
    resource_type: "raw",
    overwrite: true,
    invalidate: true,
  });
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const stored = await fetchManifestFromCloud();
  if (!stored) return buildDefaultManifest();
  return mergeManifests(buildDefaultManifest(), stored);
}

function uploadBuffer(
  buffer: Buffer,
  key: SectionImageKey
): Promise<{ secure_url: string; version: number }> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: FOLDER,
          public_id: key,
          overwrite: true,
          invalidate: true,
          resource_type: "image",
          format: "jpg",
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve({
            secure_url: result.secure_url,
            version: result.version ?? Date.now(),
          });
        }
      )
      .end(buffer);
  });
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not set up. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Vercel → Settings → Environment Variables."
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadBuffer(bytes, key);

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
