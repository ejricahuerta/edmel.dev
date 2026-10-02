import Link from "next/link";
import type { ReactNode } from "react";

/* Shared building blocks for the Fixline design system (see design-system/README.md). */

const LOGO = {
  vb: "0 0 246 84",
  word: "M18.24 56.89Q13.66 56.89 10.5 55.55Q7.34 54.21 5.35 51.85Q3.37 49.48 2.47 46.4Q1.57 43.32 1.57 39.82Q1.57 36.17 2.5 32.87Q3.43 29.57 5.38 27.01Q7.32 24.46 10.36 22.98Q13.41 21.5 17.63 21.5Q21.77 21.5 24.77 22.93Q27.78 24.36 29.62 26.94Q31.46 29.51 32.06 32.95Q32.67 36.38 32.06 40.44L7.32 40.83V35.62L25.05 35.29L23.72 38.3Q24.04 35.31 23.47 33.21Q22.89 31.1 21.47 29.98Q20.04 28.86 17.63 28.86Q15.07 28.86 13.48 30.17Q11.89 31.48 11.19 33.84Q10.5 36.2 10.5 39.38Q10.5 44.77 12.45 47.34Q14.41 49.92 18.34 49.92Q20.12 49.92 21.3 49.43Q22.49 48.95 23.21 48.08Q23.93 47.21 24.21 46.06Q24.49 44.91 24.42 43.58L32.9 44.07Q33.05 46.34 32.36 48.59Q31.68 50.85 29.98 52.71Q28.28 54.58 25.39 55.73Q22.5 56.89 18.24 56.89Z M46.69 56.89Q43.07 56.89 40.14 54.94Q37.22 53 35.49 49.01Q33.77 45.02 33.77 38.89Q33.77 33.1 35.33 29.23Q36.9 25.37 39.74 23.43Q42.58 21.5 46.36 21.5Q49.41 21.5 51.71 22.79Q54.02 24.07 55.49 26.78Q56.96 29.49 57.54 33.76H58.12Q57.78 31.37 57.47 29.19Q57.16 27.01 57.01 25.03Q56.85 23.06 56.85 21.35V11.52H66.11L66.08 43.43L66.12 56H57.98L58.14 45.35H57.67Q56.94 49.17 55.47 51.74Q54.01 54.31 51.83 55.6Q49.65 56.89 46.69 56.89ZM49.74 49.43Q51.29 49.43 52.6 48.71Q53.92 48 54.87 46.66Q55.83 45.32 56.37 43.51Q56.92 41.71 56.92 39.53V39.07Q56.92 37.37 56.55 35.86Q56.19 34.35 55.55 33.15Q54.9 31.95 54.01 31.08Q53.12 30.22 52.03 29.75Q50.94 29.29 49.74 29.29Q47.61 29.29 46.11 30.67Q44.62 32.04 43.87 34.34Q43.13 36.64 43.13 39.48Q43.13 42.26 43.9 44.53Q44.67 46.81 46.15 48.12Q47.63 49.43 49.74 49.43Z M69.11 56V38.25L69.08 22.4H77.01L76.78 36.63H77.31Q77.76 31.16 79.08 27.85Q80.39 24.53 82.62 23.02Q84.85 21.5 87.98 21.5Q91.22 21.5 93.22 23.13Q95.21 24.76 96.14 28.1Q97.07 31.43 96.93 36.63H97.46Q97.89 31.22 99.28 27.91Q100.67 24.6 102.99 23.05Q105.31 21.5 108.53 21.5Q111.15 21.5 113.07 22.46Q114.99 23.42 116.29 25.35Q117.6 27.27 118.24 30.19Q118.88 33.11 118.88 37.02V56H109.63V37.91Q109.63 35.13 109.17 33.29Q108.7 31.46 107.76 30.57Q106.82 29.67 105.34 29.67Q103.38 29.67 101.83 31.35Q100.28 33.02 99.38 36.28Q98.47 39.54 98.47 44.39V56H89.45V37.62Q89.45 34.89 88.98 33.15Q88.51 31.4 87.55 30.54Q86.58 29.67 85.12 29.67Q83.24 29.67 81.72 31.18Q80.19 32.68 79.27 35.94Q78.35 39.2 78.35 44.39V56Z M137.34 56.89Q132.77 56.89 129.61 55.55Q126.44 54.21 124.46 51.85Q122.47 49.48 121.57 46.4Q120.67 43.32 120.67 39.82Q120.67 36.17 121.61 32.87Q122.54 29.57 124.48 27.01Q126.42 24.46 129.47 22.98Q132.51 21.5 136.74 21.5Q140.87 21.5 143.88 22.93Q146.88 24.36 148.72 26.94Q150.56 29.51 151.17 32.95Q151.78 36.38 151.17 40.44L126.42 40.83V35.62L144.15 35.29L142.83 38.3Q143.15 35.31 142.57 33.21Q141.99 31.1 140.57 29.98Q139.15 28.86 136.74 28.86Q134.18 28.86 132.59 30.17Q131 31.48 130.3 33.84Q129.6 36.2 129.6 39.38Q129.6 44.77 131.56 47.34Q133.51 49.92 137.44 49.92Q139.22 49.92 140.41 49.43Q141.59 48.95 142.31 48.08Q143.03 47.21 143.31 46.06Q143.59 44.91 143.52 43.58L152 44.07Q152.15 46.34 151.47 48.59Q150.78 50.85 149.08 52.71Q147.38 54.58 144.49 55.73Q141.6 56.89 137.34 56.89Z M153.77 56V11.52H163.01V56Z",
  dev: "M177.18 56.32Q175.65 56.32 175.02 55.68Q174.4 55.04 174.4 54.11V53.28Q174.4 52.35 175.02 51.71Q175.65 51.07 177.18 51.07Q178.72 51.07 179.34 51.71Q179.97 52.35 179.97 53.28V54.11Q179.97 55.04 179.34 55.68Q178.72 56.32 177.18 56.32Z M199.97 53.18H199.78Q199.04 54.69 197.82 55.54Q196.61 56.38 194.78 56.38Q191.87 56.38 190.14 54.21Q188.42 52.03 188.42 47.74Q188.42 43.46 190.14 41.28Q191.87 39.1 194.78 39.1Q196.61 39.1 197.82 39.95Q199.04 40.8 199.78 42.3H199.97V32.32H203.46V56H199.97ZM196.22 53.54Q196.99 53.54 197.66 53.34Q198.34 53.15 198.85 52.77Q199.36 52.38 199.66 51.82Q199.97 51.26 199.97 50.5V44.99Q199.97 44.22 199.66 43.66Q199.36 43.1 198.85 42.72Q198.34 42.34 197.66 42.14Q196.99 41.95 196.22 41.95Q194.24 41.95 193.17 43.17Q192.1 44.38 192.1 46.4V49.09Q192.1 51.1 193.17 52.32Q194.24 53.54 196.22 53.54Z M215.94 56.38Q214.05 56.38 212.54 55.78Q211.04 55.17 210.02 54.05Q208.99 52.93 208.45 51.34Q207.9 49.76 207.9 47.78Q207.9 45.79 208.46 44.19Q209.02 42.59 210.03 41.46Q211.04 40.32 212.48 39.71Q213.92 39.1 215.68 39.1Q217.41 39.1 218.82 39.7Q220.22 40.29 221.22 41.38Q222.21 42.46 222.74 43.97Q223.26 45.47 223.26 47.3V48.61H211.42V49.15Q211.42 51.1 212.64 52.34Q213.86 53.57 216 53.57Q217.6 53.57 218.74 52.88Q219.87 52.19 220.58 51.04L222.75 52.96Q221.92 54.4 220.21 55.39Q218.5 56.38 215.94 56.38ZM215.68 41.76Q214.75 41.76 213.97 42.08Q213.18 42.4 212.62 42.99Q212.06 43.58 211.74 44.38Q211.42 45.18 211.42 46.14V46.37H219.71V46.05Q219.71 44.1 218.61 42.93Q217.5 41.76 215.68 41.76Z M232.64 56 226.72 39.49H230.34L232.61 46.46L234.75 53.09H234.94L237.09 46.46L239.36 39.49H242.85L236.93 56Z",
  line: "M2 74 q12.77 -8 25.53 0 t25.53 0 L161.58 74",
  markE: "M32.85 37.64Q29.56 37.64 27.29 36.67Q25.02 35.71 23.59 34.01Q22.16 32.32 21.52 30.1Q20.87 27.88 20.87 25.37Q20.87 22.75 21.54 20.37Q22.21 18 23.61 16.17Q25 14.33 27.19 13.27Q29.38 12.21 32.41 12.21Q35.39 12.21 37.55 13.23Q39.7 14.26 41.03 16.11Q42.35 17.96 42.79 20.43Q43.22 22.9 42.79 25.81L25 26.1V22.35L37.74 22.11L36.79 24.28Q37.02 22.13 36.61 20.62Q36.19 19.11 35.17 18.3Q34.15 17.5 32.41 17.5Q30.57 17.5 29.43 18.44Q28.29 19.37 27.79 21.07Q27.28 22.77 27.28 25.06Q27.28 28.93 28.69 30.78Q30.1 32.63 32.92 32.63Q34.2 32.63 35.05 32.28Q35.9 31.93 36.42 31.31Q36.94 30.68 37.14 29.85Q37.34 29.03 37.29 28.08L43.38 28.43Q43.49 30.05 43 31.68Q42.51 33.3 41.29 34.64Q40.07 35.98 37.99 36.81Q35.91 37.64 32.85 37.64Z",
  markLine: "M12 50 q3.2 -7.2 6.4 0 t6.4 0 L52 50",
};

export function Logo({
  variant = "lockup",
  height = 32,
  className,
}: {
  variant?: "lockup" | "wordmark" | "mark";
  height?: number;
  className?: string;
}) {
  const mark = (
    <svg viewBox="0 0 64 64" style={{ height, width: height }} aria-hidden>
      <rect className="lg-tile" width="64" height="64" rx="10" />
      <path className="lg-tile-ink" d={LOGO.markE} />
      <path className="lg-tile-line" d={LOGO.markLine} strokeWidth={4.5} />
    </svg>
  );
  const word = (
    <svg viewBox={LOGO.vb} style={{ height: variant === "wordmark" ? height : height * 0.86, width: "auto" }} aria-hidden>
      <path className="lg-ink" d={LOGO.word} />
      <path className="lg-muted" d={LOGO.dev} />
      <path className="lg-line" d={LOGO.line} strokeWidth={5} />
    </svg>
  );
  return (
    <span className={["ed-logo", className].filter(Boolean).join(" ")} style={{ height }}>
      {variant !== "wordmark" ? mark : null}
      {variant !== "mark" ? word : null}
    </span>
  );
}

export function Fixline({ width = 240, strokeWidth = 5, amplitude = 5 }: { width?: number; strokeWidth?: number; amplitude?: number }) {
  const seg = (width - 8) * 0.16;
  const d = `M4 12 q${seg / 2} ${-amplitude * 2} ${seg} 0 t${seg} 0 L${width - 4} 12`;
  return (
    <svg className="ed-fixline" viewBox={`0 0 ${width} 24`} width={width} height={24} aria-hidden>
      <path d={d} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <span className="ed-arrow" aria-hidden>
      {external ? "\u2197" : "\u2192"}
    </span>
  );
}

export function SectionLabel({ id, count, children }: { id?: string; count?: number; children: ReactNode }) {
  return (
    <h2 className="ed-label" id={id}>
      {children}
      {count != null ? <span className="ed-label-count">({count})</span> : null}
    </h2>
  );
}

export function Mark({ children }: { children: ReactNode }) {
  return <mark className="ed-mark">{children}</mark>;
}

export type Status = "open" | "progress" | "resolved";
const STATUS: Record<Status, [string, string]> = {
  open: ["\u2715", "open"],
  progress: ["\u25D0", "in progress"],
  resolved: ["\u2713", "resolved"],
};

export function StatusPill({ status, children, className }: { status: Status; children?: ReactNode; className?: string }) {
  const [glyph, word] = STATUS[status];
  return (
    <span className={["ed-status", `ed-status-${status}`, className].filter(Boolean).join(" ")}>
      <span className="ed-status-glyph" aria-hidden>
        {glyph}
      </span>
      {children ?? word}
    </span>
  );
}

export function Chips({ items, label = "Stack" }: { items: string[]; label?: string }) {
  return (
    <ul className="ed-chips" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="ed-chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Window({
  title,
  meta,
  live,
  className,
  id,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  live?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className={["ed-window", className].filter(Boolean).join(" ")} id={id}>
      <div className="ed-window-bar">
        <span className={live ? "ed-window-dot is-live" : "ed-window-dot"} aria-hidden />
        <span className="ed-window-title">{title}</span>
        {meta ? <span className="ed-window-meta">{meta}</span> : null}
      </div>
      <div className="ed-window-body">{children}</div>
    </div>
  );
}

export function SpecList({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="ed-spec">
      {items.map(([k, v]) => (
        <div key={k} className="ed-spec-row">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Section({
  id,
  label,
  count,
  children,
}: {
  id?: string;
  label?: string;
  count?: number;
  children: ReactNode;
}) {
  const hid = id ? `${id}-heading` : undefined;
  return (
    <section className="ed-section" id={id} aria-labelledby={label ? hid : undefined}>
      <div className="ed-container">
        {label ? (
          <SectionLabel id={hid} count={count}>
            {label}
          </SectionLabel>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  block = false,
  href,
  external = false,
  type = "button",
  onClick,
  disabled,
  className,
  children,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  block?: boolean;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = ["ed-btn", `ed-btn-${variant}`, size === "sm" ? "ed-btn-sm" : null, block ? "ed-btn-block" : null, className]
    .filter(Boolean)
    .join(" ");
  const body = (
    <>
      {children}
      {arrow ? <Arrow external={external} /> : null}
    </>
  );

  if (href && external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {body}
      </a>
    );
  }
  if (href && href.startsWith("#")) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {body}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={cls} href={href} onClick={onClick}>
        {body}
      </Link>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {body}
    </button>
  );
}
