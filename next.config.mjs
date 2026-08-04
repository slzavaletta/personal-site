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
};

export default nextConfig;
