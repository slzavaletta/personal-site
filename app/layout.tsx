import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

import { THEME_BOOT_SCRIPT } from "@/app/components/theme/theme";
import { CURRENT_TITLE, ROLE_TRANSITION, SITE_LINKS } from "@/app/lib/content";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/app/lib/site";
import "./globals.css";

/*
 * Archivo carries the name and every heading, and its width axis is what the
 * hero animates, so the variable font loads with `wdth` and stays on the
 * critical path. Source Sans sets the reading copy. IBM Plex Mono only sets
 * dates and figures; `preload: false` keeps it off first-paint contention.
 * next/font generates metric-matched fallbacks, so a late swap does not
 * reflow.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
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
const ROLE = CURRENT_TITLE;
const DESCRIPTION = ROLE_TRANSITION.public
  ? `Technical Project Manager running enterprise AI and software delivery — staffing, P&L, risk, adoption and the client decisions that follow. Joining ${ROLE_TRANSITION.next.company} as ${ROLE_TRANSITION.next.title} in ${ROLE_TRANSITION.startsOnLabel}. Ten years of delivery across the United States and Latin America.`
  : "Technical Project Manager running enterprise AI and software delivery — staffing, P&L, risk, adoption and the client decisions that follow. Ten years of delivery across the United States and Latin America.";

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
    "Technical Program Manager",
    "Enterprise AI deployment",
    "AI delivery",
    "AI in clinical development",
    "Regulated industries",
    "Program management",
    "P&L ownership",
    "Distributed teams",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#131513" },
  ],
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
    name: ROLE_TRANSITION.current.company,
  },
  knowsAbout: [
    "Enterprise AI deployment",
    "AI pilot delivery",
    "Technology adoption",
    "Technical program management",
    "P&L ownership",
    "Distributed team leadership",
    "Workflow automation",
    "Life sciences",
  ],
  sameAs: [SITE_LINKS.linkedin, SITE_LINKS.github],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:min-h-11 focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-signal"
        >
          Skip to content
        </a>
        {children}
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
