import { CONTENT_SIGNAL, DISCOVERY_LINKS, portfolioMarkdown } from "@/app/lib/representations";
export const dynamic = "force-static";
export function GET() {
  return new Response(portfolioMarkdown(), { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Signal": CONTENT_SIGNAL,
    Link: DISCOVERY_LINKS,
    "Cache-Control": "public, max-age=3600, must-revalidate",
  } });
}
