import { ArrowRight } from "lucide-react";

import { PROOF } from "@/app/lib/content";
import {
  Stagger,
  StaggerItem,
} from "@/app/components/motion/Reveal";

/**
 * The proof index closes the hero rather than standing on its own: same paper
 * surface, no separators, a legend set on the rule, and column rules that
 * continue the hero grid. Values share one baseline so the row reads as an
 * index, not as four floating stat cards.
 */
export function ProofBand() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="page-shell pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="flex items-center gap-5">
        <h2 id="proof-heading" className="utility-label text-signal">
          Evidence
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-rule-strong" />
      </div>

      <Stagger as="ul" className="proof-index" amount={0.2}>
        {PROOF.map((item) => (
          <StaggerItem as="li" key={item.value} className="proof-index__item">
            {item.trend ? (
              <p className="proof-index__value proof-index__value--trend">
                <span className="sr-only">
                  {`${item.trend.from} to ${item.trend.to}`}
                </span>
                <span aria-hidden="true" className="proof-index__from">
                  {item.trend.from}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="proof-index__arrow"
                />
                <span aria-hidden="true">{item.trend.to}</span>
              </p>
            ) : (
              <p className="proof-index__value">{item.value}</p>
            )}
            <p className="proof-index__label">{item.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
