import { ANTHEM, CONTACT, LOCATION, SITE_LINKS } from "@/app/lib/content";
import { SITE_EMAIL, SITE_NAME } from "@/app/lib/site";
import { SolDeMayo } from "@/app/components/SolDeMayo";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-0">
      <div className="page-shell section-block">
        <h2 className="utility-label">{CONTACT.heading}</h2>
        <p className="reading-copy mt-5">{CONTACT.body}</p>

        <p className="mt-10">
          <a href={SITE_LINKS.email} className="contact-email">
            {SITE_EMAIL}
          </a>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1">
          <a
            href={SITE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-base"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href={SITE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-base"
          >
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        <p className="figure mt-10 text-sm text-mute">
          {LOCATION.city}, {LOCATION.country}
        </p>

        <p className="colophon">
          <SolDeMayo className="colophon__sol" />
          <span lang="es" className="colophon__line">
            {ANTHEM.line}
          </span>
          <span lang="es" className="colophon__source">
            {ANTHEM.source}
          </span>
        </p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule-strong">
      <div className="page-shell flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {SITE_NAME}
          <span aria-hidden="true"> · </span>
          Technical Project Manager
          <span aria-hidden="true"> · </span>
          {LOCATION.city}
        </p>
        <a
          href="#top"
          className="hairline-link inline-flex min-h-11 items-center text-sm font-bold"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
