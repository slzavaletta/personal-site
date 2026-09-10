import {
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  INDUSTRIES,
  SITE_LINKS,
  CASE_STUDIES,
} from "@/app/lib/content";

import { Case } from "@/app/components/CaseStudies";

function industriesSentence() {
  const last = INDUSTRIES[INDUSTRIES.length - 1];
  const head = INDUSTRIES.slice(0, -1).join(", ");
  return `${head}, and ${last}.`;
}

export function Experience() {
  return (
    <section id="experience" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head reveal">
          <span className="section-index" aria-hidden="true">
            04 /
          </span>
          <h2 className="editorial-heading">{EXPERIENCE_SECTION.heading}</h2>
          <p className="reading-copy">{EXPERIENCE_SECTION.note}</p>
          <a href={SITE_LINKS.resume} download className="text-link text-base">
            Download résumé
          </a>
        </div>

        <ol className="experience-list">
          {EXPERIENCE.map((item) => {
            const upcoming = "upcoming" in item && item.upcoming;
            const concurrent = "concurrent" in item && item.concurrent;
            return (
              <li key={`${item.company}-${item.period}`}>
                <div className="experience-period">
                  {item.period}
                  {upcoming ? (
                    <span className="experience-flag">Upcoming</span>
                  ) : null}
                  {concurrent ? (
                    <span className="experience-flag">
                      Concurrent with Globant
                    </span>
                  ) : null}
                </div>
                <div>
                  <h3 className="experience-company">{item.company}</h3>
                  <p className="experience-title">{item.title}</p>
                </div>
                <p className="experience-body">{item.body}</p>
              </li>
            );
          })}
        </ol>
        <div className="experience-case">
          <Case caseStudy={CASE_STUDIES[2]} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="utility-label">Credentials</h3>
            <ul className="credential-list">
              {CERTIFICATIONS.map((certification) => {
                const meta = [
                  "issuer" in certification ? certification.issuer : null,
                  "year" in certification ? certification.year : null,
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <li key={certification.name}>
                    <p className="font-semibold">{certification.name}</p>
                    <p className="mt-1 text-sm text-mute">
                      {meta ? `${meta}. ` : null}
                      {certification.status === "In progress"
                        ? "In progress."
                        : "Earned."}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="utility-label">Where I have worked</h3>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed">
              {industriesSentence()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
