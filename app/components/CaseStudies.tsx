import { CASE_STUDIES, WORK_INTRO } from "@/app/lib/content";
import type { CaseStudy } from "@/app/lib/content";

const NOTE_KEYS = ["context", "constraint", "work"] as const;

const NOTE_LABELS = {
  context: "Context",
  constraint: "Constraint",
  work: "Work",
} as const;

/**
 * Three dossiers at equal weight. Nothing is hidden behind a click: a
 * recruiter skims, and anything behind an affordance is effectively not on
 * the page. The vermilion trace on the left draws itself as the case enters
 * the viewport, in CSS.
 */
function Dossier({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article id={caseStudy.id} className="dossier scroll-mt-24">
      <div className="dossier__grid">
        <header className="dossier__head">
          <p className="font-mono text-2xl font-medium tracking-[-0.06em] text-signal-ink sm:text-3xl">
            {caseStudy.number}
          </p>
          <p className="utility-label mt-3 text-ink">{caseStudy.label}</p>
          <p className="figure mt-2 text-graphite">{caseStudy.period}</p>
        </header>

        <div className="dossier__body">
          <h3 className="max-w-[24ch] text-3xl leading-[1.02] font-semibold tracking-[-0.05em] sm:text-[2.4rem]">
            {caseStudy.title}
          </h3>
          <p className="reading-copy mt-5">{caseStudy.summary}</p>
        </div>

        <div className="dossier__signal">
          <p className="utility-label text-signal-ink">Result signal</p>
          <p className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.035em]">
            {caseStudy.marginalia.signal}
          </p>
        </div>
      </div>

      <dl className="dossier__notes">
        {NOTE_KEYS.map((key) => (
          <div key={key} className="flex max-w-[38ch] flex-col gap-1.5">
            <dt className="utility-label text-graphite">{NOTE_LABELS[key]}</dt>
            <dd className="text-[0.875rem] leading-relaxed text-ink">
              {caseStudy.marginalia[key]}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <div>
            <p className="utility-label text-signal-ink">Selected work</p>
            <h2 className="editorial-heading mt-5">{WORK_INTRO.heading}</h2>
          </div>
          <p className="reading-copy">{WORK_INTRO.body}</p>
        </div>

        <div className="mt-10 sm:mt-12">
          {CASE_STUDIES.map((caseStudy) => (
            <Dossier key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
