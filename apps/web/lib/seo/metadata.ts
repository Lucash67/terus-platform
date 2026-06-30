import type { Metadata } from "next";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants/site";

import { OG_IMAGE_PATH, SITE_URL } from "./site-url";

const KEYWORDS = [
  "Supply Chain Intelligence",
  "inteligência operacional",
  "varejo",
  "distribuição",
  "automação de reposição",
  "ruptura de gôndola",
  "Winthor",
  "RMS",
  "Terus Platform",
];

interface PageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

function resolveTitle(title: string): string {
  if (title.includes("Terus Platform")) {
    return title;
  }
  return `${title} | Terus Platform`;
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  ogType = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const resolvedTitle = resolveTitle(title);
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title: resolvedTitle,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: ogType,
      locale: "pt_BR",
      url: canonicalPath,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
          },
        }),
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terus Platform — Supply Chain Intelligence",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Terus Tecnologia" }],
  creator: "Terus Tecnologia",
  publisher: "Terus Tecnologia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: "Terus Platform — Supply Chain Intelligence",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terus Platform — Supply Chain Intelligence",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
