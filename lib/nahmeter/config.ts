import { z } from "zod";

/** nah.meter's account backend: prices, trial, and the server's settings. */
export const PRICE_CENTS = 500;
export const TRIAL_DAYS = 14;
export const CONTACT_EMAIL = "contact@edmel.dev";
export const APK_URL = "https://github.com/ejricahuerta/nah-meter/releases/latest/download/nahmeter.apk";
export const LEGAL_BASE = "https://github.com/ejricahuerta/nah-meter/blob/main/app/src/main/assets/legal";

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  /** Where couriers send their Interac e-Transfer (Autodeposit on). */
  NAHMETER_PAY_EMAIL: z.string().email(),
  /** The admin page's password (HTTP Basic, any user name). */
  NAHMETER_ADMIN_PASSWORD: z.string().min(16),
  /** The site the sign-in link points at; it must serve /nahmeter/auth/confirm. */
  NAHMETER_SITE_URL: z.string().url().default("https://edmel.dev"),
});

export type NahmeterEnv = z.infer<typeof envSchema>;

/** The server's settings, or null with the missing names when it isn't set up yet. */
export function nahmeterEnv(): { env: NahmeterEnv } | { missing: string[] } {
  const parsed = envSchema.safeParse(process.env);
  if (parsed.success) return { env: parsed.data };
  return { missing: parsed.error.issues.map((i) => i.path.join(".")) };
}

/** The pay address for public pages; a placeholder until it's set. */
export function payEmail(): string {
  return process.env.NAHMETER_PAY_EMAIL ?? "the address in the app";
}
