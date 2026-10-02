import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/tooltip-provider";
import "./globals.css";

const display = localFont({
  src: [{ path: "./fonts/BricolageGrotesque-Variable.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const mono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/IBMPlexMono-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexMono-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.edmel.dev"),
  title: {
    default: "edmel.dev",
    template: "%s · edmel.dev",
  },
  description:
    "Enterprise quality, startup speed. De-slop vibe-coded apps and lock down the data. Edmel Ricahuerta.",
  openGraph: {
    type: "website",
    siteName: "edmel.dev",
    locale: "en_CA",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e100f",
};

// Applies a saved theme before first paint so Paper users don't see a dark flash.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Browser extensions (Grammarly, screen recorders) stamp data-* attributes
    // onto html/body before React hydrates, and the theme script sets
    // data-theme; suppress only these two elements' own attribute warnings.
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="ed-skip">
          Skip to content
        </a>
        <TooltipProvider>
          <div className="ed-page">{children}</div>
        </TooltipProvider>
      </body>
    </html>
  );
}
