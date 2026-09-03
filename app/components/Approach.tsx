import { BRIEF } from "@/app/lib/content";
import { BriefInstrument } from "@/app/components/BriefInstrument";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-8">
      <div className="page-shell section-block">
        <div className="section-head">
          <p className="utility-label">{BRIEF.label}</p>
          <h2 className="editorial-heading mt-2 max-w-[20ch]">
            {BRIEF.heading}
          </h2>
          <p className="reading-copy">{BRIEF.body}</p>
        </div>

        <BriefInstrument />
      </div>
    </section>
  );
}
