import {
  SECTION_IMAGES_BUCKET,
  SUPABASE_URL,
  sectionImagesManifestUrl,
} from "@/config/supabase-public";
import {
  buildDefaultManifest,
  mergeManifests,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

export function publicStorageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${SECTION_IMAGES_BUCKET}/${path}`;
}

export async function fetchPublicSectionImageManifest(): Promise<SectionImageManifest | null> {
  try {
    const res = await fetch(`${sectionImagesManifestUrl()}?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const stored = (await res.json()) as SectionImageManifest;
    return mergeManifests(buildDefaultManifest(), stored);
  } catch {
    return null;
  }
}
