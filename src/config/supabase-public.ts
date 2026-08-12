/** Public Supabase URL — safe to use in browser code. */
export const SUPABASE_URL = "https://qfjrjpnphlujxhivxhin.supabase.co";

export const SECTION_IMAGES_BUCKET = "section-images";

export function isSupabasePublicConfigured(): boolean {
  return Boolean(SUPABASE_URL);
}

export function sectionImagesManifestUrl(): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${SECTION_IMAGES_BUCKET}/manifest.json`;
}
