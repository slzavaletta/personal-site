import {
  CASE_STUDIES,
  EXPERIENCE,
  PROOF_LINE,
  WORK_INTRO,
} from "@/app/lib/content";
import type { CaseStudy } from "@/app/lib/content";

export function Case({
  caseStudy,
  number,
}: {
  caseStudy: CaseStudy;
  number?: string;
}) {
  return (
    <article id={caseStudy.id} className="case">
      <div className="case__heading">
        {number && (
          <span className="case__number" aria-hidden="true">
            {number}
          </span>
        )}
        <p className="case__meta">
          {caseStudy.label}
          <span aria-hidden="true"> · </span>
          {caseStudy.period}
        </p>
        <h3 className="case__title">{caseStudy.title}</h3>
      </div>
      <div className="case__detail">
        <p className="reading-copy">{caseStudy.summary}</p>
        <dl className="case__notes">
          <div>
            <dt className="utility-label">Context</dt>
            <dd>{caseStudy.context}</dd>
          </div>
          <div>
            <dt className="utility-label">Constraint</dt>
            <dd>{caseStudy.constraint}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function CaseStudies() {
  const blueCrab = EXPERIENCE.find(
    (item) => item.company === "Blue Crab Consulting",
  )!;
  return (
    <section id="work" className="section-block">
      <div className="page-shell">
        <div className="section-head">
          <span className="section-index" aria-hidden="true">
            01 /
          </span>
          <h2 className="editorial-heading">{WORK_INTRO.heading}</h2>
          <p className="reading-copy">{WORK_INTRO.body}</p>
        </div>
        <p className="proof-line">{PROOF_LINE}</p>
        <div className="case-stack">
          <Case caseStudy={CASE_STUDIES[0]} number="01" />
          <article
            id="enterprise-ai-implementations"
            className="case case--featured"
          >
            <div className="case__heading">
              <span className="case__number" aria-hidden="true">
                02
              </span>
              <p className="case__meta">
                {blueCrab.title}
                <span aria-hidden="true"> · </span>
                {blueCrab.period}
              </p>
              <h3 className="case__title">{blueCrab.company}</h3>
              <p className="experience-flag">Concurrent with Globant</p>
            </div>
            <div className="case__detail">
              <p className="reading-copy">{blueCrab.body}</p>
            </div>
          </article>
          <Case caseStudy={CASE_STUDIES[1]} number="03" />
        </div>
      </div>
    </section>
  );
}
