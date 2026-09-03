import { HERO } from "@/app/lib/content";

export function EditorialHero() {
  return (
    <section id="top" className="scroll-mt-0">
      <div className="page-shell pt-10 sm:pt-14">
        <p className="max-w-[62ch] text-sm leading-relaxed text-mute">
          {HERO.role}
        </p>

        <h1 className="hero-name mt-6">
          {HERO.firstName} {HERO.lastName}.
        </h1>

        <p className="hero-statement mt-8">{HERO.statement}</p>

        <div className="mt-8 grid max-w-[62ch] gap-5">
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

      {/*
       * The sky band is decorative: the clock in the header already carries
       * the time as text. The disc's position comes from `data-hour`, written
       * on the server, so it renders correctly without JavaScript.
       */}
      <div className="sky" aria-hidden="true">
        <span className="sky__horizon" />
        <span className="sun" />
      </div>
    </section>
  );
}
