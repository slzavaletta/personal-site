import {
  ArrowUp,
  ArrowUpRight,
  Code2,
  Mail,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CONTACT, SITE_LINKS } from "@/app/lib/content";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-8 bg-field">
      <div className="page-shell section-block">
        <div className="grid gap-10 border-t border-rule-strong pt-5 lg:grid-cols-12">
          <p className="utility-label text-signal-ink lg:col-span-3">
            05 / Contact
          </p>
          <div className="lg:col-span-9">
            <h2 className="max-w-[13ch] text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-[7.8rem]">
              {CONTACT.heading}
            </h2>
            <p className="reading-copy mt-8">{CONTACT.body}</p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={SITE_LINKS.email}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
              >
                Email Santiago
                <Mail data-icon="inline-end" aria-hidden="true" />
              </a>
              <a
                href={SITE_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                Connect on LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </a>
              <a
                href={SITE_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                })}
              >
                View GitHub
                <span className="sr-only"> (opens in new tab)</span>
                <Code2 data-icon="inline-end" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-inverse text-paper">
      <div className="page-shell grid gap-6 py-8 sm:grid-cols-2 sm:items-center lg:grid-cols-12">
        <p className="utility-label text-paper lg:col-span-4">
          Santiago López Zavaletta
        </p>
        <p className="font-mono text-[0.8125rem] leading-relaxed text-paper/58 sm:text-right lg:col-span-4 lg:text-center">
          Technical Project Manager / Buenos Aires
        </p>
        <div className="flex items-center gap-5 sm:col-span-2 sm:justify-end lg:col-span-4">
          <a
            href={SITE_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hairline-link inline-flex min-h-11 min-w-11 items-center gap-1.5 font-mono text-[0.8125rem] text-paper/72"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href="#top"
            className="hairline-link inline-flex min-h-11 min-w-11 items-center gap-1.5 font-mono text-[0.8125rem] text-paper/72"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
