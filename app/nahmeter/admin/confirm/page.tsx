import type { Metadata } from "next";
import { confirmAdminLink } from "@/app/nahmeter/admin/actions";

export const metadata: Metadata = { title: "nah.meter admin", robots: { index: false, follow: false } };

/** Where the admin sign-in email's link goes. Signing in takes a tap, so a link scanner opening the page doesn't use the link up. */
export default async function ConfirmAdmin({ searchParams }: { searchParams: Promise<{ token_hash?: string }> }) {
  const { token_hash } = await searchParams;
  return (
    <main className="ed-page">
      <div className="ed-container ed-section" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--measure)" }}>
        <h1 className="ed-h1">nah.meter admin</h1>
        {token_hash ? (
          <form action={confirmAdminLink}>
            <input type="hidden" name="token_hash" value={token_hash} />
            <button type="submit" className="ed-btn ed-btn-primary">Sign in</button>
          </form>
        ) : (
          <p className="ed-body">This link is missing its sign-in code. Send a new one from the admin page.</p>
        )}
      </div>
    </main>
  );
}
