import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/tooltip-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Browser extensions (Grammarly, screen recorders) stamp data-* attributes
    // onto html/body before React hydrates, which trips the hydration warning.
    // This suppresses only these two elements' own attributes — mismatches
    // inside components still report normally.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
