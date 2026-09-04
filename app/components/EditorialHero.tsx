import type { CSSProperties } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO } from "@/app/lib/content";
import { SolDeMayo } from "@/app/components/SolDeMayo";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function MaskWords({
  text,
  offset,
  italic = false,
}: {
  text: string;
  offset: number;
  italic?: boolean;
}) {
  return text.split(" ").map((word, index) => (
    <span
      key={`${word}-${index}`}
      aria-hidden="true"
      className="mask-word"
      style={{ "--i": offset + index } as CSSProperties}
    >
      <span>{italic ? <em>{word}</em> : word}</span>
    </span>
  ));
}

export function EditorialHero() {
  const plainCount = HERO.display.split(" ").length;

  return (
    <section id="top" className="cover scroll-mt-0">
      <div className="cover__glow" aria-hidden="true" />

      <div className="page-shell pt-8 pb-10 sm:pt-10 sm:pb-12">
        <div className="cover-grid">
          <div>
            <p
              className="fade-up max-w-[62ch] text-[0.9375rem] leading-relaxed font-semibold"
              style={delay(60)}
            >
              <span aria-hidden="true" className="live-dot" />
              {HERO.role}
            </p>

            <h1
              className="cover-display mt-6"
              aria-label={`${HERO.display} ${HERO.displayEmphasis}`}
            >
              <MaskWords text={HERO.display} offset={0} />
              <MaskWords
                text={HERO.displayEmphasis}
                offset={plainCount}
                italic
              />
            </h1>

            <p className="hero-statement fade-up mt-8" style={delay(520)}>
              {HERO.statement}
            </p>
          </div>

          <aside className="cover-panel fade-up" style={delay(280)}>
            <SolDeMayo className="cover-panel__sol" />
            <p className="cover-panel__copy">{HERO.supporting}</p>
            <p className="cover-panel__copy">{HERO.direction}</p>
            <div className="cover-panel__actions">
              <a
                href={HERO.primaryAction.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "cover-panel__btn cover-panel__btn--fill",
                )}
              >
                {HERO.primaryAction.label}
              </a>
              <a
                href={HERO.secondaryAction.href}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "cover-panel__btn cover-panel__btn--ghost",
                )}
              >
                {HERO.secondaryAction.label}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
