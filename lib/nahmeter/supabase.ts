import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NahmeterEnv } from "@/lib/nahmeter/config";

const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };

/** For sign-in emails, verifying links and refreshing sessions (the public key). */
export function authClient(env: NahmeterEnv): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, options);
}

/**
 * For the nah.meter tables and deleting users. Server only: never send this key anywhere. Queries go
 * to the `nahmeter` schema (it must be in the project's Data API exposed schemas).
 */
export function adminClient(env: NahmeterEnv) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { ...options, db: { schema: "nahmeter" } });
}

export type AdminClient = ReturnType<typeof adminClient>;
