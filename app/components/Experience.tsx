import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  INDUSTRIES,
  SITE_LINKS,
} from "@/app/lib/content";

export function Experience() {
  return (
    <section id="experience" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <div>
            <p className="utility-label text-signal-ink">Experience</p>
            <h2 className="editorial-heading mt-5">
              {EXPERIENCE_SECTION.heading}
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-graphite">
              {EXPERIENCE_SECTION.note}
            </p>
          </div>
          <a
            href={SITE_LINKS.resume}
            download
            className="text-link justify-self-start text-base lg:justify-self-end"
          >
            Download résumé
            <Download aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <ol className="timeline lg:col-span-8">
            {EXPERIENCE.map((item) => {
              const upcoming = "upcoming" in item && item.upcoming;
              const concurrent = "concurrent" in item && item.concurrent;
              return (
                <li
                  key={`${item.company}-${item.period}`}
                  className="timeline-row"
                  data-upcoming={upcoming || undefined}
                >
                  <div className="timeline-row__meta">
                    <p className="figure text-graphite">{item.period}</p>
                    {upcoming ? (
                      <p className="figure mt-2 text-signal-ink">Upcoming</p>
                    ) : null}
                    {concurrent ? (
                      <p className="figure mt-2 text-signal-ink">
                        Concurrent with Globant
                      </p>
                    ) : null}
                  </div>
                  <div className="timeline-row__role">
                    <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                      {item.company}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                  </div>
                  <p className="timeline-row__body text-sm leading-relaxed text-graphite">
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ol>

          <aside
            aria-label="Credentials and areas of experience"
            className="lg:col-span-4 lg:pl-8"
          >
            <div>
              <p className="utility-label text-graphite">Credentials</p>
              <ul className="mt-6 border-t border-rule-strong">
                {CERTIFICATIONS.map((certification) => {
                  const meta = [
                    "issuer" in certification ? certification.issuer : null,
                    "year" in certification ? certification.year : null,
                  ]
                    .filter(Boolean)
                    .join(" · ");

                  return (
                    <li
                      key={certification.name}
                      className="border-b border-rule py-5"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <h3 className="leading-snug font-semibold">
                          {certification.name}
                        </h3>
                        <Badge
                          variant={
                            certification.status === "In progress"
                              ? "signal"
                              : "secondary"
                          }
                        >
                          {certification.status}
                        </Badge>
                      </div>
                      {meta ? (
                        <p className="figure mt-2 text-graphite">{meta}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8">
              <p className="utility-label text-graphite">
                Areas I&apos;ve worked in
              </p>
              <ul className="mt-6 grid grid-cols-2 border-t border-rule-strong">
                {INDUSTRIES.map((industry) => (
                  <li
                    key={industry}
                    className="border-b border-rule py-3 pr-3 text-sm font-semibold even:border-l even:pl-3"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
