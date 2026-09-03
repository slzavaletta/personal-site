import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CONTACT, LOCATION, SITE_LINKS } from "@/app/lib/content";
import { SITE_EMAIL, SITE_NAME } from "@/app/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-8 bg-field">
      <div className="page-shell section-block">
        <div className="grid gap-10 border-t border-rule-strong pt-4 lg:grid-cols-12">
          <p className="utility-label text-signal-ink lg:col-span-3">Contact</p>
          <div className="lg:col-span-9">
            <h2 className="editorial-heading max-w-[18ch]">
              {CONTACT.heading}
            </h2>
            <p className="reading-copy mt-8">{CONTACT.body}</p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
              <a
                href={SITE_LINKS.email}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Email Santiago
                <Mail data-icon="inline-end" aria-hidden="true" />
              </a>
              <a
                href={SITE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-base"
              >
                LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={SITE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-base"
              >
                GitHub
                <span className="sr-only"> (opens in new tab)</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>

            <p className="figure mt-8 text-graphite">
              {SITE_EMAIL} · {LOCATION.city}, {LOCATION.country}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule-strong">
      <div className="page-shell grid gap-6 py-8 sm:grid-cols-2 sm:items-center lg:grid-cols-12">
        <p className="utility-label lg:col-span-4">{SITE_NAME}</p>
        <p className="figure text-graphite sm:text-right lg:col-span-4 lg:text-center">
          Technical Project Manager / {LOCATION.city}
        </p>
        <div className="flex items-center gap-5 sm:col-span-2 sm:justify-end lg:col-span-4">
          <a
            href={SITE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hairline-link figure inline-flex min-h-11 min-w-11 items-center gap-1.5"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href="#top"
            className="hairline-link figure inline-flex min-h-11 min-w-11 items-center gap-1.5"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
