import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/admin",
        "/portal",
        "/onboarding",
        "/ativacao-demo",
        "/entrar",
        "/criar-conta",
        "/recuperar-acesso",
        "/redefinir-senha",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
