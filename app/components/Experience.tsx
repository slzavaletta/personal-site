import {
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  INDUSTRIES,
  SITE_LINKS,
} from "@/app/lib/content";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="experience-head">
        <h2 id="experience-heading">{EXPERIENCE_SECTION.heading}</h2>
        <p>{EXPERIENCE_SECTION.note}</p>
      </div>
      <ol className="experience-list">
        {EXPERIENCE.map((item) => (
          <li key={item.company}>
            <div>
              {"upcoming" in item && item.upcoming && (
                <p className="eyebrow">Upcoming</p>
              )}
              {"concurrent" in item && item.concurrent && (
                <p className="eyebrow">Concurrent with Globant</p>
              )}
              <h3>{item.company}</h3>
              <p className="experience-period">{item.period}</p>
            </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="credentials">
        <div>
          <h2>Credentials</h2>
          <ul>
            {CERTIFICATIONS.map((item) => (
              <li key={item.name}>
                {item.name}
                <span>
                  {"issuer" in item
                    ? item.issuer + ", " + item.year + ". "
                    : ""}
                  {item.status}.
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Where I have worked</h2>
          <p>
            {INDUSTRIES.slice(0, -1).join(", ")}, and {INDUSTRIES.at(-1)}.
          </p>
          <a href={SITE_LINKS.resume} download className="text-link">
            Download résumé ↗
          </a>
        </div>
      </div>
    </section>
  );
}
