import type { Metadata, Viewport } from "next";
import { Andada_Pro, Atkinson_Hyperlegible } from "next/font/google";

import { THEME_BOOT_SCRIPT } from "@/app/components/theme/theme";
import { CURRENT_TITLE, ROLE_TRANSITION, SITE_LINKS } from "@/app/lib/content";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/app/lib/site";
import { getBuenosAiresHour } from "@/app/lib/time";
import "./globals.css";

/*
 * Andada Pro is an Argentine slab, designed for bilingual print. Atkinson
 * Hyperlegible is the reading face: characters that cannot be mistaken for
 * each other. Neither is the kit that shipped with the last design.
 */
const andada = Andada_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
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
    { media: "(prefers-color-scheme: light)", color: "#F3E6C8" },
    { media: "(prefers-color-scheme: dark)", color: "#2A241F" },
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
      className={`${andada.variable} ${atkinson.variable}`}
      data-hour={String(getBuenosAiresHour())}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:min-h-11 focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
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
