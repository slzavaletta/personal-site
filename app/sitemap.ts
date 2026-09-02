import type { MetadataRoute } from "next";

import { CONTENT_UPDATED_ON, SITE_URL } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(CONTENT_UPDATED_ON),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
