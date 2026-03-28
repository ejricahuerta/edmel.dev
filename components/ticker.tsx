"use client";

const TOOLS = [
  ".NET 8 / C#",
  "ASP.NET Web API",
  "Blazor / WASM",
  "SvelteKit",
  "React / TypeScript",
  "EF Core / Dapper",
  "SQL Server",
  "PostgreSQL",
  "Supabase",
  "Snowflake",
  "AWS · EC2 · Lambda",
  "Docker",
  "GitHub Actions",
  "SAML 2.0 / OAuth 2.0",
  "JWT / SSO / RBAC",
  "OpenAI API",
  "Retell AI",
  "ElevenLabs",
  "n8n / Make.com",
  "Stripe",
  "PostHog",
  "Vercel",
  "Zapier",
  "Twilio",
  "SendGrid",
  "Google Workspace",
  "Slack API",
  "Airtable",
  "Notion API",
  "Typeform",
  "Mailchimp",
  "PayPal",
  "Google Analytics",
  "Google Maps API",
  "Calendly",
  "WhatsApp Business API",
] as const;

const COLORS = [
  "#569cd6",
  "#4ec9b0",
  "#ce9178",
  "#dcdcaa",
  "#6a9955",
  "#c586c0",
  "#4fc1ff",
  "#b5cea8",
];

export function Ticker() {
  const doubled = [...TOOLS, ...TOOLS];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="t-item">
            <span
              className="t-dot"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
