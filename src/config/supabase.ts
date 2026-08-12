/**
 * One-time setup (free Supabase account — no Vercel env vars needed):
 *
 * 1. Sign up at https://supabase.com/dashboard
 * 2. Create a new project (free tier)
 * 3. Storage → New bucket → name: section-images → Public bucket: ON
 * 4. Project Settings → API → copy Project URL + service_role key (secret)
 * 5. Paste below, commit, and push (site redeploys once)
 */
export const SUPABASE_URL = "";
export const SUPABASE_SERVICE_ROLE_KEY = "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}
