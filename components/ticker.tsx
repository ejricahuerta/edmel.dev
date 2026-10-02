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

export function Ticker() {
  const doubled = [...TOOLS, ...TOOLS];
  return (
    <div className="ed-ticker" role="region" aria-label="Stack I work in">
      <div className="ed-ticker-track">
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="ed-ticker-item"
            aria-hidden={i >= TOOLS.length ? true : undefined}
          >
            <span className="ed-ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
