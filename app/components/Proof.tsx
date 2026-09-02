import { PROOF } from "@/app/lib/content";

/**
 * Five figures, static, each attached to the sentence it supports. Values
 * share one baseline so the row reads as an index, not as floating stats.
 */
export function Proof() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="page-shell pb-12 sm:pb-14 lg:pb-16"
    >
      <div className="flex items-center gap-5">
        <h2 id="proof-heading" className="utility-label text-signal-ink">
          Evidence
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-rule-strong" />
      </div>

      <ul className="proof-index">
        {PROOF.map((item) => (
          <li key={item.value} className="proof-index__item">
            <p className="proof-index__value">{item.value}</p>
            <p className="proof-index__label">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
