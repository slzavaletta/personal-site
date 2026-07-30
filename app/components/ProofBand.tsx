import { Separator } from "@/components/ui/separator";
import { PROOF } from "@/app/lib/content";
import {
  Stagger,
  StaggerItem,
} from "@/app/components/motion/Reveal";

export function ProofBand() {
  return (
    <section aria-labelledby="proof-heading" className="bg-field">
      <Separator />
      <h2 id="proof-heading" className="sr-only">
        Career evidence
      </h2>
      <div className="page-shell">
        <Stagger
          as="ul"
          className="grid sm:grid-cols-2 xl:grid-cols-4"
          amount={0.15}
        >
          {PROOF.map((item, index) => (
            <StaggerItem
              as="li"
              key={item.value}
              className="border-b border-rule px-0 py-8 sm:min-h-52 sm:px-6 sm:py-10 sm:first:pl-0 sm:[&:nth-child(even)]:border-l xl:border-b-0 xl:border-l xl:first:border-l-0 xl:first:pl-0"
            >
              <p className="utility-label text-signal-on-field">
                {String(index + 1).padStart(2, "0")} / Evidence
              </p>
              <p className="proof-value mt-8">{item.value}</p>
              <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-graphite">
                {item.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Separator />
    </section>
  );
}
