import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) return false;
  if (
    url.includes("your-project-id") ||
    serviceKey.includes("your-service-role")
  ) {
    return false;
  }
  return true;
}

export function getSupabaseBucketName(): string {
  return (process.env.SUPABASE_STORAGE_BUCKET || "media").trim();
}

let cachedAdminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cachedAdminClient) return cachedAdminClient;

  cachedAdminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
  return cachedAdminClient;
}
