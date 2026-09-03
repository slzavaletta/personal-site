/*
 * The host that actually serves. The apex 308s to www, so a canonical or an
 * og:url on the apex would point search engines and link unfurlers at a
 * redirect.
 */
export const SITE_URL = "https://www.slzavaletta.com";

export const SITE_NAME = "Santiago López Zavaletta";

export const SITE_EMAIL = "santiago@slzavaletta.com";

/**
 * Date of the last content change, in UTC. Drives the sitemap's lastModified
 * so search engines see a real modification date rather than the build
 * timestamp. Update it when `content.ts` changes in a way a reader would
 * notice.
 */
export const CONTENT_UPDATED_ON = "2026-09-03";
