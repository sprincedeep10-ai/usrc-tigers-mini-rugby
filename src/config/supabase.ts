/**
 * Server-only Supabase credentials.
 * Project URL lives in supabase-public.ts (also used by the browser).
 */
import {
  SUPABASE_URL,
  isSupabasePublicConfigured,
} from "@/config/supabase-public";

export { SUPABASE_URL, isSupabasePublicConfigured };

export const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanJqcG5waGx1anhoaXZ4aGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjUzMTA5MiwiZXhwIjoyMTAyMTA3MDkyfQ.e3yprpcLmqaWwC60A4PMi97HPegA0YWodc2c1GZAc90";

export function isSupabaseConfigured(): boolean {
  return isSupabasePublicConfigured() && Boolean(SUPABASE_SERVICE_ROLE_KEY);
}
