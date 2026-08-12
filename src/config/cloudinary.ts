/**
 * One-time setup (free Cloudinary account — no Vercel env vars needed):
 *
 * 1. Sign up at https://cloudinary.com/users/register/free
 * 2. Dashboard → copy your **Cloud name**
 * 3. Settings → Upload → Upload presets → Add preset:
 *    - Name: usrc-tigers (or any name — paste it below)
 *    - Signing mode: **Unsigned**
 *    - Overwrite: **leave OFF** (unsigned presets cannot use overwrite)
 * 4. Paste cloud name + preset name below, commit, and push (site redeploys once)
 */
export const CLOUDINARY_CLOUD_NAME = "aai6silw";
export const CLOUDINARY_UPLOAD_PRESET = "usrc-tigers";

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
}
