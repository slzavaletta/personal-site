import type { MetadataRoute } from "next";

import { CONTENT_UPDATED_ON, SITE_URL } from "@/app/lib/site";
import { CASE_STUDIES } from "@/app/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/approach",
    "/systems",
    "/profile",
    "/contact",
    ...CASE_STUDIES.map((item) => "/work/" + item.id),
  ].map((path) => ({
    url: SITE_URL + path,
    lastModified: new Date(CONTENT_UPDATED_ON),
    changeFrequency: "monthly" as const,
    priority: path ? 0.8 : 1,
  }));
}
