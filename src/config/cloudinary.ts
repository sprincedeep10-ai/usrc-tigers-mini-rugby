/**
 * One-time setup (free Cloudinary account — no Vercel env vars needed):
 *
 * 1. Sign up at https://cloudinary.com/users/register/free
 * 2. Dashboard → copy **Cloud name**, **API Key**, and **API Secret**
 * 3. Paste all three below, commit, and push (site redeploys once)
 *
 * No upload preset needed — signed uploads handle everything reliably.
 */
export const CLOUDINARY_CLOUD_NAME = "aai6silw";
export const CLOUDINARY_API_KEY = "";
export const CLOUDINARY_API_SECRET = "";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET
  );
}
