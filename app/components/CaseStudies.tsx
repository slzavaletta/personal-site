import { CASE_STUDIES, WORK_INTRO } from "@/app/lib/content";
import { Reveal } from "@/app/components/motion/Reveal";

const NOTE_LABELS = {
  context: "Context",
  constraint: "Constraint",
  work: "Work",
} as const;

export function CaseStudies() {
  return (
    <section id="work" className="section-block scroll-mt-20">
      <div className="page-shell">
        <Reveal className="grid gap-7 border-t border-rule-strong pt-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="utility-label text-signal-ink">01 / Selected work</p>
            <h2 className="editorial-heading mt-5">{WORK_INTRO.heading}</h2>
          </div>
          <p className="reading-copy lg:col-span-4">{WORK_INTRO.body}</p>
        </Reveal>

        <div className="mt-16 sm:mt-24">
          {CASE_STUDIES.map((caseStudy) => (
            <Reveal
              as="article"
              key={caseStudy.id}
              className="scroll-mt-24 border-t border-rule-strong py-12 sm:py-16 lg:py-20"
            >
              <div
                id={caseStudy.id}
                className="grid gap-10 lg:grid-cols-12 lg:gap-8"
              >
                <header className="lg:col-span-2">
                  <p className="font-mono text-4xl font-medium tracking-[-0.08em] text-signal-ink">
                    {caseStudy.number}
                  </p>
                  <p className="utility-label mt-4 text-ink">
                    {caseStudy.label}
                  </p>
                  <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-graphite">
                    {caseStudy.period}
                  </p>
                </header>

                <div className="lg:col-span-6">
                  <h3 className="max-w-[17ch] text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                    {caseStudy.title}
                  </h3>
                  <p className="reading-copy mt-7">{caseStudy.summary}</p>
                </div>

                <div className="case-signal self-start p-6 sm:p-8 lg:col-span-4">
                  <p className="utility-label text-signal-ink">
                    Result signal
                  </p>
                  <p className="mt-9 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
                    {caseStudy.marginalia.signal}
                  </p>
                </div>
              </div>

              <dl className="mt-12 grid border-y border-rule sm:grid-cols-3 lg:ml-[16.666%]">
                {(["context", "constraint", "work"] as const).map((key) => (
                  <div
                    key={key}
                    className="border-b border-rule px-0 py-6 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0"
                  >
                    <dt className="utility-label text-graphite">
                      {NOTE_LABELS[key]}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-ink">
                      {caseStudy.marginalia[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
