import type { CSSProperties } from "react";
import { ArrowDown, Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HERO } from "@/app/lib/content";
import { KineticName } from "@/app/components/KineticName";

const enter = (index: number) => ({ "--i": index }) as CSSProperties;

export function EditorialHero() {
  const lines = [HERO.firstName, ...HERO.lastName.split(" ")];

  return (
    <section id="top" className="hero-grid scroll-mt-0">
      <div className="page-shell pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pb-14">
        <p
          className="hero-enter utility-label flex items-center justify-between gap-4 border-t border-rule-strong pt-3 text-graphite"
          style={enter(0)}
        >
          <span className="max-w-[60ch] tracking-normal normal-case">
            {HERO.role}
          </span>
        </p>

        <KineticName
          lines={lines}
          ariaLabel={`${HERO.firstName} ${HERO.lastName}`}
          className="display-name mt-9 uppercase sm:mt-8 lg:mt-10"
        />

        <div className="mt-10 grid gap-10 border-t border-rule-strong pt-6 sm:mt-8 lg:grid-cols-12 lg:gap-8">
          <p
            className="hero-enter hero-statement text-2xl leading-[1.12] font-semibold tracking-[-0.04em] sm:text-3xl lg:col-span-6 lg:text-[2.4rem]"
            style={enter(1)}
          >
            {HERO.statement}
          </p>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
            <p
              className="hero-enter text-xl leading-relaxed text-graphite"
              style={enter(2)}
            >
              {HERO.supporting}
            </p>
            <p
              className="hero-enter field-note text-base leading-relaxed text-ink"
              style={enter(3)}
            >
              {HERO.direction}
            </p>
            <div
              className="hero-enter flex flex-col gap-3 sm:flex-row"
              style={enter(4)}
            >
              <a
                href={HERO.primaryAction.href}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                {HERO.primaryAction.label}
                <ArrowDown data-icon="inline-end" aria-hidden="true" />
              </a>
              <a
                href={HERO.secondaryAction.href}
                download
                className="text-link self-center px-1 text-base"
              >
                {HERO.secondaryAction.label}
                <Download aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
