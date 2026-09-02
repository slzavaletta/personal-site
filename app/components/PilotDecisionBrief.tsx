import { PILOT_DECISION_BRIEF } from "@/app/lib/content";
import { DecisionTrace } from "@/app/components/motion/DecisionTrace";
import { Reveal } from "@/app/components/motion/Reveal";

const ANNOTATIONS = [
  {
    label: "Working brief / v0.1",
    body: PILOT_DECISION_BRIEF.body,
  },
  {
    label: "Why this page",
    body: "This gives the client and delivery team a shared answer to two questions: what are we trying to prove, and what will we do with the result?",
  },
] as const;

export function PilotDecisionBrief() {
  return (
    <section id="pilot-brief" className="bg-inverse text-paper">
      <div className="page-shell section-block">
        <Reveal className="border-t border-paper/35 pt-4">
          <p className="utility-label text-signal-on-dark">
            {PILOT_DECISION_BRIEF.label}
          </p>
          <h2 className="mt-5 max-w-[16ch] text-3xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            {PILOT_DECISION_BRIEF.heading}
          </h2>
        </Reveal>

        {/*
          The brief holds the main column and its notes sit in the margin, but
          only once the main column is wide enough to set a field on one line.
          Below that the notes fall under the brief as a pair.
        */}
        <div className="mt-8 grid gap-10 sm:mt-9 xl:grid-cols-12 xl:gap-8">
          <DecisionTrace
            className="xl:col-span-8"
            fields={PILOT_DECISION_BRIEF.fields}
            ariaLabel="Five fields in the pilot decision brief"
          />

          <div className="grid gap-10 sm:grid-cols-2 xl:col-span-3 xl:col-start-10 xl:grid-cols-1">
            {ANNOTATIONS.map((note) => (
              <div key={note.label} className="field-note">
                <p className="utility-label text-signal-on-dark">
                  {note.label}
                </p>
                <p className="mt-4 text-base leading-relaxed text-paper/72">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
