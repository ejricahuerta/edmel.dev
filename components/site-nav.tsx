"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Logo } from "@/components/ui";
import { SOCIALS } from "@/lib/site";

type Theme = "dark" | "light";

export function SiteNav({
  base = "",
  current,
}: {
  /** Prefix for in-page anchors: "" on the home page, "/" elsewhere. */
  base?: string;
  /** Label of the link to mark as the current page. */
  current?: string;
}) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const links: [string, string][] = [
    ["Services", `${base}#services`],
    ["Work", `${base}#work`],
    ["Known issues", `${base}#known-issues`],
    ["Case study", "/work/6ixback"],
  ];

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: theme just won't persist */
    }
    setTheme(next);
  }

  return (
    <header className="ed-nav">
      <div className="ed-container ed-nav-in">
        <Link href={base || "/"} className="ed-nav-brand" aria-label="edmel.dev home">
          <Image src="/edmel.png" alt="" width={32} height={32} className="ed-nav-avatar" priority />
          <Logo variant="wordmark" height={28} />
        </Link>

        <nav aria-label="Primary">
          <ul className="ed-nav-links">
            {links.map(([label, href]) => (
              <li key={label}>
                <Link href={href} aria-current={current === label ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ed-nav-right">
          <button
            type="button"
            className="ed-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            <span aria-hidden>{theme === "light" ? "☾" : "☀"}</span>
          </button>
          <Button href={`${base}#contact`} size="sm" className="ed-nav-cta">
            Start a rescue
          </Button>
          <button
            type="button"
            className="ed-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden>{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="ed-sheet" id="mobile-menu">
          <div className="ed-container">
            <ul>
              {links.map(([label, href], i) => (
                <li key={label}>
                  <Link href={href} onClick={() => setOpen(false)} aria-current={current === label ? "page" : undefined}>
                    {label}
                    <span>0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ed-sheet-foot">
              <Button href={`${base}#contact`} block arrow onClick={() => setOpen(false)}>
                Start a rescue
              </Button>
              <div className="ed-socials">
                {SOCIALS.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    {label} {"↗"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
