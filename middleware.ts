import { NextResponse, type NextRequest } from "next/server";
import { prefersMarkdown } from "@/app/lib/accept";
import {
  CONTENT_SIGNAL,
  DISCOVERY_LINKS,
  portfolioMarkdown,
} from "@/app/lib/representations";

/** Runs before the page cache. Assets, RSC and non-root routes keep their format. */
export function middleware(request: NextRequest) {
  if (
    !request.headers.has("rsc") &&
    !request.headers.has("next-router-prefetch") &&
    ["GET", "HEAD"].includes(request.method) &&
    prefersMarkdown(request.headers.get("accept"))
  ) {
    return new NextResponse(
      request.method === "HEAD" ? null : portfolioMarkdown(),
      {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "private, no-store",
          Vary: "Accept",
          Link: DISCOVERY_LINKS,
          "Content-Signal": CONTENT_SIGNAL,
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}
export const config = {
  matcher: [
    {
      source: "/",
      missing: [
        { type: "header", key: "rsc" },
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-router-segment-prefetch" },
      ],
    },
  ],
};
