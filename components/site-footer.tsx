import Link from "next/link";
import { Logo } from "@/components/ui";
import { SOCIALS } from "@/lib/site";

export function SiteFooter({ base = "" }: { base?: string }) {
  const site: [string, string][] = [
    ["Services", `${base}#services`],
    ["Work", `${base}#work`],
    ["Known issues", `${base}#known-issues`],
    ["Case study", "/work/6ixback"],
  ];
  return (
    <footer className="ed-footer">
      <div className="ed-container">
        <div className="ed-footer-grid">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Logo variant="wordmark" height={36} />
            <p className="ed-small" style={{ maxWidth: "28em" }}>
              Enterprise quality. Startup speed. Rescue engineering for apps that
              outgrew the demo.
            </p>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              {site.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              {SOCIALS.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ed-footer-base">
          <span>Toronto &amp; GTA · Edmel Ricahuerta</span>
          <span>© {new Date().getFullYear()} edmel.dev</span>
        </div>
      </div>
    </footer>
  );
}
