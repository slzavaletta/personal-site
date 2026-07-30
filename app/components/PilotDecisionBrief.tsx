import { Badge } from "@/components/ui/badge";
import { PILOT_DECISION_BRIEF } from "@/app/lib/content";
import { DecisionTrace } from "@/app/components/motion/DecisionTrace";
import { Reveal } from "@/app/components/motion/Reveal";

export function PilotDecisionBrief() {
  const points = PILOT_DECISION_BRIEF.fields.map((field) => ({
    label: `${field.number} / ${field.title}`,
    detail: field.prompt,
  }));

  return (
    <section id="pilot-brief" className="bg-inverse text-paper">
      <div className="page-shell section-block">
        <Reveal className="grid gap-10 border-t border-paper/35 pt-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Badge variant="inverse">{PILOT_DECISION_BRIEF.label}</Badge>
            <h2 className="mt-7 max-w-[14ch] text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {PILOT_DECISION_BRIEF.heading}
            </h2>
          </div>

          <div className="field-note self-end lg:col-span-4">
            <p className="utility-label text-signal-on-dark">
              Working brief / v0.1
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper/72">
              {PILOT_DECISION_BRIEF.body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-16 sm:mt-24">
          <DecisionTrace
            points={points}
            ariaLabel="Five fields in the pilot decision brief"
            className="text-signal-on-dark"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 border-t border-paper/20 pt-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <span className="utility-label text-signal-on-dark">Why this page</span>
          <p className="max-w-[72ch] text-base leading-relaxed text-paper/72">
            This gives the client and delivery team a shared answer to two
            questions: what are we trying to prove, and what will we do with
            the result?
          </p>
        </div>
      </div>
    </section>
  );
}
