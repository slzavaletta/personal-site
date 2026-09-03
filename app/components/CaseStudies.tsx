import { CASE_STUDIES, PROOF_LINE, WORK_INTRO } from "@/app/lib/content";
import type { CaseStudy } from "@/app/lib/content";

function Case({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article id={caseStudy.id} className="case scroll-mt-24">
      <p className="case__meta">
        {caseStudy.label}
        <span aria-hidden="true"> · </span>
        {caseStudy.period}
      </p>
      <h3 className="case__title">{caseStudy.title}</h3>
      <p className="reading-copy mt-4 text-ink">{caseStudy.summary}</p>
      <dl className="case__notes">
        <div>
          <dt className="utility-label">Context</dt>
          <dd className="mt-1 text-sm leading-relaxed">{caseStudy.context}</dd>
        </div>
        <div>
          <dt className="utility-label">Constraint</dt>
          <dd className="mt-1 text-sm leading-relaxed">
            {caseStudy.constraint}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <h2 className="editorial-heading">{WORK_INTRO.heading}</h2>
          <p className="reading-copy">{WORK_INTRO.body}</p>
          <p className="text-[1.0625rem] leading-relaxed">{PROOF_LINE}</p>
        </div>

        <div className="mt-8 sm:mt-10">
          {CASE_STUDIES.map((caseStudy) => (
            <Case key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
