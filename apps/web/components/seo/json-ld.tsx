import {
  BRAND,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants/site";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/seo/site-url";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Terus Tecnologia",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  description: SITE_DESCRIPTION,
  brand: {
    "@type": "Brand",
    name: BRAND.name,
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "Supply Chain Intelligence",
    "Automação de reposição",
    "Inteligência operacional",
    "Varejo",
    "Distribuição",
  ],
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: SITE_TAGLINE,
  operatingSystem: "Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    url: `${SITE_URL}/solicitar-demo`,
  },
  featureList: [
    "Terus Alert",
    "Terus Strategy",
    "Terus Order",
    "Terus Task",
    "Terus Log",
    "Terus Pulse",
  ],
  provider: {
    "@type": "Organization",
    name: "Terus Tecnologia",
    url: SITE_URL,
  },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
    </>
  );
}
