import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { MotionProvider } from "@/app/components/motion/MotionProvider";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/app/lib/site";
import "./globals.css";

/*
 * Archivo and Source Sans carry the hero, so they stay on the critical path.
 * IBM Plex Mono only sets small labels; `preload: false` keeps it off the
 * first-paint contention while `swap` still renders it the moment it lands.
 * next/font generates the metric-matched Arial fallbacks automatically, so a
 * late swap does not reflow.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-utility",
  display: "swap",
  preload: false,
});

const NAME = SITE_NAME;
/*
 * The title a reader can verify on LinkedIn and in the résumé. "AI deployment"
 * is the direction of the work and belongs in the description, not here.
 */
const ROLE = "Technical Project Manager";
const DESCRIPTION =
  "Technical Project Manager running enterprise AI and software delivery: choosing the use case, running the pilot, supporting adoption, and taking the scale-or-stop decision. Ten years of delivery across the United States and Latin America, with staffing and P&L ownership.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — ${ROLE}`,
    template: `%s — ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: `${NAME} portfolio`,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  category: "portfolio",
  keywords: [
    "Technical Project Manager",
    "Enterprise AI deployment",
    "AI delivery",
    "AI deployment",
    "Software delivery",
    "Program management",
    "P&L ownership",
    "Distributed teams",
    "Globant",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F7F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: ROLE,
  description: DESCRIPTION,
  url: SITE_URL,
  email: `mailto:${SITE_EMAIL}`,
  worksFor: {
    "@type": "Organization",
    name: "Globant",
  },
  /*
   * Ordered by what the page argues he does, and what he wants to be found
   * for. "Scrum" comes out: it stays accurate in the credentials block and the
   * Approach body, but here it is a top-level self-description and it is not
   * the one that should lead.
   */
  knowsAbout: [
    "Enterprise AI deployment",
    "AI pilot delivery",
    "Technology adoption",
    "Technical delivery leadership",
    "Program management",
    "P&L ownership",
    "Distributed team leadership",
    "Workflow automation",
  ],
  sameAs: [
    "https://www.linkedin.com/in/slzavaletta",
    "https://github.com/slzavaletta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/*
          The section index ships hidden so it cannot flash over the hero, and
          its own script clears that. With scripting off nothing ever will, so
          this hands it back — the links work, they just cannot follow along.
        */}
        <noscript>
          <style>{`.section-index[data-pending]{opacity:1;pointer-events:auto}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:min-h-11 focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-signal"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
