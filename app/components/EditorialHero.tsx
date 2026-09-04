import type { CSSProperties } from "react";

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
      <SolDeMayo className="hero__sol" />

      <div className="page-shell pt-10 pb-12 sm:pt-14 sm:pb-14">
        <p
          className="fade-up max-w-[62ch] text-[0.9375rem] leading-relaxed font-bold"
          style={delay(60)}
        >
          <span aria-hidden="true" className="live-dot" />
          {HERO.role}
        </p>

        <h1
          className="cover-display mt-8"
          aria-label={`${HERO.display} ${HERO.displayEmphasis}`}
        >
          <MaskWords text={HERO.display} offset={0} />
          <MaskWords text={HERO.displayEmphasis} offset={plainCount} italic />
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <p
            className="hero-statement fade-up lg:col-span-6"
            style={delay(520)}
          >
            {HERO.statement}
          </p>

          <div
            className="fade-up grid max-w-[62ch] content-start gap-5 lg:col-span-5 lg:col-start-8"
            style={delay(640)}
          >
            <p className="text-[1.0625rem] leading-relaxed text-mute">
              {HERO.supporting}
            </p>
            <p className="text-[1.0625rem] leading-relaxed">{HERO.direction}</p>
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-8">
              <a href={HERO.primaryAction.href} className="text-link text-base">
                {HERO.primaryAction.label}
              </a>
              <a
                href={HERO.secondaryAction.href}
                download
                className="text-link text-base"
              >
                {HERO.secondaryAction.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
