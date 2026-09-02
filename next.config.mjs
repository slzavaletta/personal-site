const isProduction = process.env.NODE_ENV === "production";

/*
 * The page has no third-party script, no analytics and no remote asset, so
 * the policy can be tight. `'unsafe-inline'` remains on scripts and styles
 * because Next inlines its hydration payload and, with `inlineCss`, the
 * stylesheet. A nonce would remove it but forces dynamic rendering on every
 * request; for a page that is otherwise cacheable that is the worse trade.
 *
 * Development needs `'unsafe-eval'` for source maps and a websocket for
 * hot reload; both are dropped from the production policy.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isProduction ? "" : " ws: wss:"}`,
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // The route ships a single small stylesheet that blocks first paint on a
    // network round trip. Inlining it lets the hero paint from the HTML
    // response, and moves font discovery to parse time.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
