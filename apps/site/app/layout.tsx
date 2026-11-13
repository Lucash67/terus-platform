import type { Metadata } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeScript } from "@/components/theme/theme-script";
import { rootMetadata } from "@/lib/seo/metadata";

import "./globals.css";
import "./experience.css";

// Fontes servidas localmente (OFL, ver app/fonts/LICENSE.md): o build não depende do Google Fonts.
const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin.woff2", weight: "500 700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ibmPlexSans = localFont({
  src: [
    {
      path: "./fonts/ibm-plex-sans-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ibm-plex-sans-500-latin.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "./fonts/ibm-plex-mono-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ibm-plex-mono-500-latin.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base font-sans text-text-primary antialiased">
        <ThemeScript />
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
