"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The ONLY data chart on the site. Two coarse bars: account margin
 * before (40%) and now (45%), with the +5pp delta carried in the accent.
 * Honest two-point comparison, not a fake monthly time series.
 * Bars grow once via scaleY (transform only); static under reduced motion.
 */
const SCALE_TOP = 50; // chart top of axis = 50%, so bars read as near-full

function barHeight(pct: number) {
  return `${(pct / SCALE_TOP) * 100}%`;
}

export function MarginChart() {
  const reduce = useReducedMotion();

  const grow = (h: string, delay: number) =>
    reduce
      ? { initial: false as const, style: { height: h } }
      : {
          style: { height: h, transformOrigin: "bottom" as const },
          initial: { scaleY: 0 },
          whileInView: { scaleY: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
        };

  return (
    <figure className="hover-glow rounded-[var(--radius)] border border-line bg-surface/60 p-6 sm:p-7">
      <figcaption className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs text-muted">Account margin</span>
        <span className="font-mono text-xs text-accent">+5pp</span>
      </figcaption>

      <div className="flex items-end gap-8" style={{ height: 168 }}>
        {/* Before: 40% */}
        <div className="flex h-full flex-1 flex-col justify-end">
          <motion.div
            className="w-full rounded-t-sm bg-surface-2 ring-1 ring-inset ring-line-strong"
            {...grow(barHeight(40), 0)}
          />
        </div>

        {/* Now: 45% with the delta segment in accent */}
        <div className="flex h-full flex-1 flex-col justify-end">
          <motion.div
            className="flex w-full flex-col justify-end overflow-hidden rounded-t-sm"
            {...grow(barHeight(45), 0.12)}
          >
            <div
              className="w-full bg-accent"
              style={{ height: `${(5 / 45) * 100}%` }}
            />
            <div
              className="w-full bg-surface-2 ring-1 ring-inset ring-line-strong"
              style={{ height: `${(40 / 45) * 100}%` }}
            />
          </motion.div>
        </div>
      </div>

      <div className="mt-3 flex gap-8 font-mono text-sm">
        <div className="flex-1">
          <div className="text-text">40%</div>
          <div className="text-xs text-faint">before</div>
        </div>
        <div className="flex-1">
          <div className="text-text">45%</div>
          <div className="text-xs text-faint">now</div>
        </div>
      </div>
    </figure>
  );
}
