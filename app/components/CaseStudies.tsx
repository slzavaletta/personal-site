import { CASE_STUDIES, WORK_INTRO } from "@/app/lib/content";
import type { CaseStudy } from "@/app/lib/content";
import { Reveal } from "@/app/components/motion/Reveal";

const NOTE_KEYS = ["context", "constraint", "work"] as const;

const NOTE_LABELS = {
  context: "Context",
  constraint: "Constraint",
  work: "Work",
} as const;

/**
 * The three cases carried identical 830px blocks, each with its own padded
 * result panel and its own three-column metadata strip — the heaviest
 * repetition on the page. The AI delivery case stays at full weight as the
 * flagship; the other two keep every fact but render them in a single dense
 * row. Nothing is hidden behind a click: a recruiter skims, and anything
 * behind an affordance is effectively not on the page.
 */
function CaseHeader({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <header className="lg:col-span-2">
      <p className="font-mono text-2xl font-medium tracking-[-0.06em] text-signal-ink sm:text-3xl">
        {caseStudy.number}
      </p>
      <p className="utility-label mt-3 text-ink">{caseStudy.label}</p>
      <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-graphite">
        {caseStudy.period}
      </p>
    </header>
  );
}

function FlagshipCase({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Reveal
      as="article"
      className="scroll-mt-24 border-t border-rule-strong py-10 lg:py-14"
    >
      <div id={caseStudy.id} className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <CaseHeader caseStudy={caseStudy} />

        <div className="lg:col-span-6">
          <h3 className="max-w-[19ch] text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.6rem]">
            {caseStudy.title}
          </h3>
          <p className="reading-copy mt-5">{caseStudy.summary}</p>
        </div>

        <div className="case-signal self-start p-6 lg:col-span-4">
          <p className="utility-label text-signal-ink">Result signal</p>
          <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.035em]">
            {caseStudy.marginalia.signal}
          </p>
        </div>
      </div>

      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5 lg:ml-[16.666%]">
        {NOTE_KEYS.map((key) => (
          <div key={key} className="flex max-w-[38ch] flex-col gap-1.5">
            <dt className="utility-label text-graphite">{NOTE_LABELS[key]}</dt>
            <dd className="text-[0.8125rem] leading-relaxed text-ink">
              {caseStudy.marginalia[key]}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function DenseCase({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Reveal
      as="article"
      className="scroll-mt-24 border-t border-rule-strong py-9 lg:py-10"
    >
      <div id={caseStudy.id} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <CaseHeader caseStudy={caseStudy} />

        <div className="lg:col-span-6">
          <h3 className="max-w-[26ch] text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl">
            {caseStudy.title}
          </h3>
          <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-graphite">
            {caseStudy.summary}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {NOTE_KEYS.map((key) => (
              <div key={key} className="flex max-w-[34ch] flex-col gap-1">
                <dt className="utility-label text-graphite">
                  {NOTE_LABELS[key]}
                </dt>
                <dd className="text-[0.8125rem] leading-relaxed text-ink">
                  {caseStudy.marginalia[key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="self-start lg:col-span-4 lg:border-l lg:border-rule lg:pl-8">
          <span className="utility-label block text-signal-ink">
            Result signal
          </span>
          <span className="mt-3 block text-xl font-semibold leading-snug tracking-[-0.025em]">
            {caseStudy.marginalia.signal}
          </span>
        </p>
      </div>
    </Reveal>
  );
}

export function CaseStudies() {
  const [flagship, ...rest] = CASE_STUDIES;

  return (
    <section id="work" className="section-block scroll-mt-8">
      <div className="page-shell">
        <Reveal className="grid gap-7 border-t border-rule-strong pt-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="utility-label text-signal-ink">01 / Selected work</p>
            <h2 className="editorial-heading mt-5">{WORK_INTRO.heading}</h2>
          </div>
          <p className="reading-copy lg:col-span-4">{WORK_INTRO.body}</p>
        </Reveal>

        <div className="mt-8 sm:mt-12">
          <FlagshipCase caseStudy={flagship} />
          {rest.map((caseStudy) => (
            <DenseCase key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
