import { fail, userFromRequest } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient } from "@/lib/nahmeter/supabase";

/** Deletes the account: the sign-in, its dates and its payment records (they cascade). */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");

  const admin = adminClient(cfg.env);
  const user = await userFromRequest(admin, request);
  if (!user) return fail(401, "Signed out. Sign in again.");

  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return fail(502, "Couldn't delete the account. Email contact@edmel.dev.");
  return Response.json({ ok: true });
}
