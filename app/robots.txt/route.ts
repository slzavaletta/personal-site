import { CONTENT_SIGNAL } from "@/app/lib/representations";
import { SITE_URL } from "@/app/lib/site";
export const dynamic = "force-static";
export function GET() {
  return new Response(
    `User-agent: *\nContent-Signal: ${CONTENT_SIGNAL}\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\nHost: ${SITE_URL}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
