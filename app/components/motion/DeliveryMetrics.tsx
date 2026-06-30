"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "./CountUp";
import { Stagger, StaggerItem } from "./Reveal";
import { METRICS, type Metric } from "@/app/lib/content";

const R = 42;
const C = 2 * Math.PI * R;
const EASE = [0.16, 1, 0.3, 1] as const;

const CARD =
  "hover-glow flex flex-col items-center rounded-[var(--radius)] border border-line bg-surface/40 p-6 text-center";

function Ring({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const gradientId = useId();
  const target = C * (1 - value / 100);

  return (
    <div className="relative mx-auto h-[132px] w-[132px]">
      {/* subtle glow behind the number, never washing it out */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-14 w-14 rounded-full bg-accent/15 blur-xl" />
      </div>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3fb950" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="8"
          className="stroke-line-strong"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          strokeDasharray={C}
          initial={reduce ? false : { strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: target }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={reduce ? { strokeDashoffset: target } : undefined}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative font-mono text-[1.75rem] font-semibold tracking-tight text-text">
          <CountUp value={value} prefix={prefix} suffix={suffix} />
        </span>
      </div>
    </div>
  );
}

function Band({ display }: { display: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-[132px] w-[132px] flex-col items-center justify-center">
      <span className="font-mono text-[1.75rem] font-semibold tracking-tight text-text">
        {display}
      </span>
      <div className="mt-5 w-full">
        <div className="relative h-2.5 overflow-hidden rounded-full bg-surface-2 ring-1 ring-inset ring-line-strong">
          <motion.div
            className="absolute left-1/2 top-0 h-full w-[56%] -translate-x-1/2 origin-center bg-accent/35"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent" />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-faint">
          <span>-5%</span>
          <span>target</span>
          <span>+5%</span>
        </div>
      </div>
    </div>
  );
}

export function DeliveryMetrics() {
  return (
    <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map((m: Metric) => (
        <StaggerItem key={m.label} className={CARD}>
          {m.kind === "ring" ? (
            <Ring value={m.value} prefix={m.prefix} suffix={m.suffix} />
          ) : (
            <Band display={m.display} />
          )}
          <p className="mt-5 text-sm leading-relaxed text-muted">{m.label}</p>
          {m.kind === "band" && (
            <p className="mt-1 font-mono text-xs text-faint">{m.note}</p>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
