import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  INDUSTRIES,
  SITE_LINKS,
} from "@/app/lib/content";
import { Reveal } from "@/app/components/motion/Reveal";

export function ExperienceAndCredentials() {
  return (
    <section id="experience" className="section-block scroll-mt-8">
      <div className="page-shell">
        <Reveal className="grid gap-8 border-t border-rule-strong pt-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="utility-label text-signal-ink">04 / Experience</p>
            <h2 className="editorial-heading mt-5">
              {EXPERIENCE_SECTION.heading}
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-graphite">
              {EXPERIENCE_SECTION.note}
            </p>
          </div>
          <div className="lg:col-span-4">
            <a
              href={SITE_LINKS.resume}
              download
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Download résumé
              <Download data-icon="inline-end" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <ol className="border-l border-rule-strong lg:col-span-8">
            {EXPERIENCE.map((item, index) => (
              <li
                key={`${item.company}-${item.period}`}
                className="timeline-row grid gap-4 border-t border-rule py-8 pl-6 sm:grid-cols-12 sm:gap-6 sm:pl-9"
              >
                <div className="sm:col-span-3">
                  <p className="utility-label text-signal-ink">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-mono text-[0.8125rem] text-graphite">
                    {item.period}
                  </p>
                  {"concurrent" in item && item.concurrent ? (
                    <p className="mt-2 font-mono text-[0.8125rem] text-signal-ink">
                      Concurrent with Globant
                    </p>
                  ) : null}
                </div>
                <div className="sm:col-span-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-graphite sm:col-span-5">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <aside
            aria-label="Credentials and areas of experience"
            className="lg:col-span-4 lg:pl-8"
          >
            <div>
              <p className="utility-label text-graphite">
                Credentials
              </p>
              <div className="mt-6 border-t border-rule-strong">
                {CERTIFICATIONS.map((certification) => {
                  // The status already has a badge; this line is issuer and
                  // year only, and is dropped entirely when neither exists.
                  const meta = [
                    "issuer" in certification ? certification.issuer : null,
                    "year" in certification ? certification.year : null,
                  ]
                    .filter(Boolean)
                    .join(" · ");

                  return (
                    <div
                      key={certification.name}
                      className="border-b border-rule py-5"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <h3 className="font-semibold leading-snug">
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
                        <p className="mt-2 text-sm text-graphite">{meta}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
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
