import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SECTION_IMAGES_BUCKET,
  isSupabasePublicConfigured,
} from "@/config/supabase-public";
import {
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/config/supabase";
import { type SectionImageKey } from "@/data/section-images";
import {
  fetchPublicSectionImageManifest,
  publicStorageUrl,
} from "@/lib/section-image-manifest";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export { isSupabaseConfigured, isSupabasePublicConfigured };

const MANIFEST_PATH = "manifest.json";

function getSupabase(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function imagePath(key: SectionImageKey): string {
  return `sections/${key}.jpg`;
}

async function saveManifest(manifest: SectionImageManifest): Promise<void> {
  const supabase = getSupabase();
  const body = JSON.stringify(manifest, null, 2);

  const { error } = await supabase.storage.from(SECTION_IMAGES_BUCKET).upload(MANIFEST_PATH, body, {
    upsert: true,
    contentType: "application/json",
    cacheControl: "0",
  });

  if (error) {
    throw new Error(`Failed to save image manifest: ${error.message}`);
  }
}

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  const stored = await fetchPublicSectionImageManifest();
  if (!stored) return buildDefaultManifest();
  return stored;
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob,
  currentManifest?: SectionImageManifest
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Photo storage is not set up yet. Open src/config/supabase.ts and add your Supabase service role key, then push to GitHub once."
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const path = imagePath(key);
  const supabase = getSupabase();

  const { error } = await supabase.storage.from(SECTION_IMAGES_BUCKET).upload(path, bytes, {
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
