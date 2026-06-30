"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "./CountUp";
import { DEALS } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX = Math.max(...DEALS.map((d) => d.people));

const track: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const bar: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

export function DealBars() {
  const reduce = useReducedMotion();

  return (
    <figure className="hover-glow rounded-[var(--radius)] border border-line bg-surface/40 p-6 sm:p-7">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs text-muted">Deals by headcount</span>
        <span className="font-mono text-xs text-faint">people</span>
      </figcaption>

      <motion.ul
        className="mt-5 space-y-4"
        variants={reduce ? undefined : track}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.4 }}
      >
        {DEALS.map((d, i) => (
          <li key={i}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-sm text-text">
                {d.label}
                <span className="ml-2 font-mono text-xs text-faint">
                  {d.kind}
                </span>
              </span>
              <span className="font-mono text-sm text-muted">
                ~<CountUp value={d.people} />
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-2 ring-1 ring-inset ring-line-strong">
              <motion.div
                className={`h-full origin-left rounded-full ${
                  d.kind === "Post-merger integration"
                    ? "bg-accent"
                    : "bg-accent/55"
                }`}
                style={{ width: `${(d.people / MAX) * 100}%` }}
                variants={reduce ? undefined : bar}
              />
            </div>
          </li>
        ))}
      </motion.ul>

      <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-faint">
        4 deals · ~940 people · 4 countries
      </p>
    </figure>
  );
}
