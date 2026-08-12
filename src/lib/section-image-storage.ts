import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/config/supabase";
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export { isSupabaseConfigured };

const BUCKET = "section-images";
const MANIFEST_PATH = "manifest.json";

function getSupabase(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function imagePath(key: SectionImageKey): string {
  return `sections/${key}.jpg`;
}

export function publicStorageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

async function fetchManifestFromStorage(): Promise<SectionImageManifest | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const res = await fetch(`${publicStorageUrl(MANIFEST_PATH)}?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as SectionImageManifest;
  } catch {
    return null;
  }
}

async function saveManifest(manifest: SectionImageManifest): Promise<void> {
  const supabase = getSupabase();
  const body = JSON.stringify(manifest, null, 2);

  const { error } = await supabase.storage.from(BUCKET).upload(MANIFEST_PATH, body, {
    upsert: true,
    contentType: "application/json",
    cacheControl: "0",
  });

  if (error) {
    throw new Error(`Failed to save image manifest: ${error.message}`);
  }
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const stored = await fetchManifestFromStorage();
  if (!stored) return buildDefaultManifest();
  return mergeManifests(buildDefaultManifest(), stored);
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob,
  currentManifest?: SectionImageManifest
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Photo storage is not set up yet. Open src/config/supabase.ts and add your Supabase URL and service role key, then push to GitHub once."
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const path = imagePath(key);
  const supabase = getSupabase();

  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    upsert: true,
    contentType: "image/jpeg",
    cacheControl: "0",
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const updatedAt = Date.now();
  const entry: SectionImageEntry = {
    url: publicStorageUrl(path),
    updatedAt,
  };

  const manifest = mergeManifests(
    currentManifest ?? (await fetchSectionImageManifest()),
    { [key]: entry }
  );

  await saveManifest(manifest);

  return { entry, manifest };
}
