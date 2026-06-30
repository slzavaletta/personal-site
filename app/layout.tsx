import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://slzavaletta.com";
const NAME = "Santiago López Zavaletta";
const ROLE = "Senior AI Project Manager";
const DESCRIPTION =
  "Senior project manager for AI and software delivery who also builds the agentic tooling, self-hosted infrastructure, and automation that runs the programs he leads.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} - ${ROLE}`,
    template: `%s - ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: `${NAME} portfolio`,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    "AI Project Manager",
    "Program Management",
    "AI Delivery",
    "Agentic AI",
    "Claude skills",
    "Delivery Manager",
    "Technical Project Manager",
    "P&L ownership",
    "Globant",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} - ${ROLE}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} - ${ROLE}`,
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
  themeColor: "#0c0c0c",
  colorScheme: "dark",
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
  email: "mailto:santiago@slzavaletta.com",
  worksFor: {
    "@type": "Organization",
    name: "Globant",
  },
  knowsAbout: [
    "AI Delivery",
    "Program Management",
    "Agentic AI tooling",
    "P&L ownership",
    "Self-hosted infrastructure",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
