import { Badge } from "@/components/ui/badge";
import { CURRENT_AND_NEXT } from "@/app/lib/content";
import { Reveal } from "@/app/components/motion/Reveal";

const OPERATING_AREAS = [
  "Scope, plans, budgets, and staffing",
  "Scrum cadence, dependencies, and risk",
  "Client communication, quality, and delivery signals",
] as const;

export function CurrentAndNext() {
  return (
    <section id="approach" className="section-block scroll-mt-8">
      <div className="page-shell">
        <Reveal>
          <p className="utility-label text-signal-ink">Current / Next</p>
          <h2 className="editorial-heading mt-5">
            {CURRENT_AND_NEXT.heading}
          </h2>
        </Reveal>

        <div className="mt-9 grid items-stretch border-y border-rule-strong lg:grid-cols-12">
          <Reveal
            as="article"
            className="py-8 lg:col-span-7 lg:border-r lg:border-rule-strong lg:py-10 lg:pr-12"
          >
            <p className="utility-label text-graphite">
              {CURRENT_AND_NEXT.current.label}
            </p>
            <h3 className="mt-5 max-w-[18ch] text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              {CURRENT_AND_NEXT.current.title}
            </h3>
            <p className="reading-copy mt-7">
              {CURRENT_AND_NEXT.current.body}
            </p>

            <ol className="numbered-list mt-10">
              {OPERATING_AREAS.map((area) => (
                <li key={area} className="font-semibold">
                  {area}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal
            as="article"
            delay={0.05}
            className="bg-signal px-6 py-8 text-paper sm:px-10 lg:col-span-5 lg:px-10 lg:py-10"
          >
            <p className="utility-label text-paper">
              {CURRENT_AND_NEXT.next.label}
            </p>
            <h3 className="mt-5 max-w-[13ch] text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              {CURRENT_AND_NEXT.next.title}
            </h3>
            <p className="mt-7 text-xl leading-relaxed text-paper">
              {CURRENT_AND_NEXT.next.body}
            </p>
          </Reveal>
        </div>

        <Reveal className="grid gap-5 border-b border-rule-strong py-7 sm:grid-cols-[auto_1fr] sm:items-start">
          <Badge variant="signal">In progress</Badge>
          <p className="max-w-[78ch] text-base leading-relaxed text-graphite">
            {CURRENT_AND_NEXT.credential}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
