import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in to nah.meter", robots: { index: false, follow: false } };

/**
 * Where the sign-in email's link goes. On a phone with nah.meter, Android opens the app instead of this
 * page (App Link). Anywhere else, this page explains and offers the app's own link as a fallback.
 */
export default async function ConfirmSignIn({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
}) {
  const { token_hash } = await searchParams;
  const appLink = token_hash ? `nahmeter://auth?token_hash=${encodeURIComponent(token_hash)}&type=email` : null;
  return (
    <main className="ed-page">
      <div className="ed-container ed-section" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--measure)" }}>
        <h1 className="ed-h1">Sign in to nah.meter</h1>
        {appLink ? (
          <>
            <p className="ed-body">Open this link on the phone where nah.meter is installed. If you&apos;re on that phone now, tap:</p>
            <div>
              <a className="ed-btn ed-btn-primary" href={appLink}>Open nah.meter</a>
            </div>
            <p className="ed-small">The link works once and expires after an hour. If it doesn&apos;t work, send a new one from the app.</p>
          </>
        ) : (
          <p className="ed-body">This link is missing its sign-in code. Send a new one from the app.</p>
        )}
      </div>
    </main>
  );
}
