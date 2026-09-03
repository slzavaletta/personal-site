import {
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  INDUSTRIES,
  SITE_LINKS,
} from "@/app/lib/content";

function industriesSentence() {
  const last = INDUSTRIES[INDUSTRIES.length - 1];
  const head = INDUSTRIES.slice(0, -1).join(", ");
  return `${head}, and ${last}.`;
}

export function Experience() {
  return (
    <section id="experience" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <h2 className="editorial-heading">{EXPERIENCE_SECTION.heading}</h2>
          <p className="reading-copy">{EXPERIENCE_SECTION.note}</p>
          <a href={SITE_LINKS.resume} download className="text-link text-base">
            Download résumé
          </a>
        </div>

        <table className="experience-table">
          <caption className="sr-only">Roles and periods</caption>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Company</th>
              <th scope="col">Role</th>
              <th scope="col">What I did</th>
            </tr>
          </thead>
          <tbody>
            {EXPERIENCE.map((item) => {
              const upcoming = "upcoming" in item && item.upcoming;
              const concurrent = "concurrent" in item && item.concurrent;
              return (
                <tr key={`${item.company}-${item.period}`}>
                  <td className="experience-table__period">
                    {item.period}
                    {upcoming ? (
                      <span className="experience-table__flag">Upcoming</span>
                    ) : null}
                    {concurrent ? (
                      <span className="experience-table__flag">
                        Concurrent with Globant
                      </span>
                    ) : null}
                  </td>
                  <td className="experience-table__company">{item.company}</td>
                  <td>{item.title}</td>
                  <td className="experience-table__body">{item.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
