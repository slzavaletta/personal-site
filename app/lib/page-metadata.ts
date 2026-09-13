import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "text/markdown": SITE_URL + "/index.md" },
    },
    openGraph: {
      title: title + " — " + SITE_NAME,
      description,
      url: SITE_URL + path,
      type: "website",
    },
    twitter: { title: title + " — " + SITE_NAME, description },
  };
}
