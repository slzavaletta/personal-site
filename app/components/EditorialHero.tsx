import { HERO } from "@/app/lib/content";

export function EditorialHero() {
  return (
    <section id="top" className="scroll-mt-0">
      <div className="page-shell pt-10 pb-12 sm:pt-14 sm:pb-14">
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed font-bold">
          {HERO.role}
        </p>

        <h1 className="cover-display mt-8">
          {HERO.display} <em>{HERO.displayEmphasis}</em>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <p className="hero-statement lg:col-span-6">{HERO.statement}</p>

          <div className="grid max-w-[62ch] content-start gap-5 lg:col-span-5 lg:col-start-8">
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
