import type { MetadataRoute } from "next";

import { PUBLIC_ROUTES } from "@/lib/seo/routes";
import { SITE_URL } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
