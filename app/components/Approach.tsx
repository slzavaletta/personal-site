import { BRIEF } from "@/app/lib/content";
import { BriefInstrument } from "@/app/components/BriefInstrument";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-8 bg-inverse text-inverse-fg">
      <div className="page-shell section-block">
        <div className="section-head border-inverse-rule">
          <div>
            <p className="utility-label text-signal-on-dark">{BRIEF.label}</p>
            <h2 className="editorial-heading mt-5 max-w-[16ch]">
              {BRIEF.heading}
            </h2>
          </div>
          <p className="reading-copy text-inverse-muted">{BRIEF.body}</p>
        </div>

        <BriefInstrument />
      </div>
    </section>
  );
}
