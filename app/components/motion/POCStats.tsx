"use client";

import { CountUp } from "./CountUp";
import { Stagger, StaggerItem } from "./Reveal";
import { POC } from "@/app/lib/content";

/**
 * Digital Twin case visual: stats-forward. Four prominent count-up stats lead,
 * the named POCs follow as a clean list. Distinct from the margin bars and the
 * deal bars. Border-glow hover only (no lift).
 */
export function POCStats() {
  return (
    <figure className="hover-glow rounded-[var(--radius)] border border-line bg-surface/40 p-6 sm:p-7">
      <figcaption className="font-mono text-xs text-muted">
        {POC.count} POCs delivered
      </figcaption>

      <Stagger className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
        {POC.stats.map((s) => (
          <StaggerItem key={s.sub}>
            <div className="font-mono text-3xl font-semibold tracking-tight text-text">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs leading-snug text-muted">{s.sub}</div>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger as="ul" className="mt-6 border-t border-line pt-4">
        {POC.named.map((name) => (
          <StaggerItem as="li" key={name}>
            <div className="flex items-center gap-2.5 py-1.5">
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span className="text-sm text-muted">{name}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </figure>
  );
}
