import { ArrowDown, Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HERO } from "@/app/lib/content";
import {
  HeroReveal,
  HeroRevealItem,
} from "@/app/components/motion/HeroReveal";

export function EditorialHero() {
  const lastNameParts = HERO.lastName.split(" ");

  return (
    <section id="top" className="hero-grid scroll-mt-0">
      <div className="page-shell pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24">
        <HeroReveal>
          <HeroRevealItem
            as="p"
            className="utility-label flex items-center justify-between gap-4 border-t border-rule-strong pt-3 text-graphite"
          >
            <span>{HERO.role}</span>
            <span className="hidden text-signal-ink sm:inline">SLZ / 2026</span>
          </HeroRevealItem>

          <h1
            className="display-name mt-14 uppercase sm:mt-20 lg:mt-24"
            aria-label={`${HERO.firstName} ${HERO.lastName}`}
          >
            <HeroRevealItem as="span" kind="name">
              {HERO.firstName}
            </HeroRevealItem>
            {lastNameParts.map((part) => (
              <HeroRevealItem key={part} as="span" kind="name">
                {part}
              </HeroRevealItem>
            ))}
          </h1>

          <div className="mt-16 grid gap-10 border-t border-rule-strong pt-6 sm:mt-20 lg:grid-cols-12 lg:gap-8">
            <HeroRevealItem
              as="p"
              className="text-2xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-3xl lg:col-span-6 lg:text-[2.4rem]"
            >
              {HERO.statement}
            </HeroRevealItem>

            <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
              <HeroRevealItem
                as="p"
                className="text-lg leading-relaxed text-graphite"
              >
                {HERO.supporting}
              </HeroRevealItem>
              <HeroRevealItem
                as="p"
                className="field-note text-base leading-relaxed text-ink"
              >
                {HERO.direction}
              </HeroRevealItem>
              <HeroRevealItem className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={HERO.primaryAction.href}
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                  })}
                >
                  {HERO.primaryAction.label}
                  <ArrowDown data-icon="inline-end" aria-hidden="true" />
                </a>
                <a
                  href={HERO.secondaryAction.href}
                  download
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  {HERO.secondaryAction.label}
                  <Download data-icon="inline-end" aria-hidden="true" />
                </a>
              </HeroRevealItem>
            </div>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
