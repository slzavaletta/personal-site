"use client";

import {
  m,
  useAnimationControls,
  useInView,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { MOTION_DURATION, MOTION_EASE } from "./tokens";

export type DecisionTracePoint = {
  label: string;
  detail?: ReactNode;
};

type DecisionTraceProps = {
  points: readonly DecisionTracePoint[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
};

const traceVariants: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
    },
  },
};

const reducedTraceVariants: Variants = {
  hidden: { opacity: 1, pathLength: 1 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0 },
  },
};

/**
 * A one-time visual link between related evidence.
 *
 * The SVG is decorative; the ordered list is the accessible source of truth
 * and is always present in server-rendered HTML.
 */
export function DecisionTrace({
  points,
  className,
  orientation = "horizontal",
  ariaLabel = "Decision trace",
}: DecisionTraceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const inView = useInView(containerRef, { once: true, amount: 0.35 });
  const shouldReduce = reduce === true;
  const isVertical = orientation === "vertical";
  const viewBox = isVertical ? "0 0 56 240" : "0 0 600 56";
  const path = isVertical ? "M 28 12 V 228" : "M 12 28 H 588";
  const pointCount = Math.max(points.length, 1);

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  useEffect(() => {
    if (shouldReduce || inView) {
      void controls.start("visible");
    }
  }, [controls, inView, shouldReduce]);

  return (
    <div
      ref={containerRef}
      className={["decision-trace", className].filter(Boolean).join(" ")}
      data-orientation={orientation}
    >
      <svg
        className="decision-trace__visual"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <m.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          variants={shouldReduce ? reducedTraceVariants : traceVariants}
          initial={false}
          animate={controls}
        />
        {points.map((point, index) => {
          const progress = pointCount === 1 ? 0.5 : index / (pointCount - 1);
          const cx = isVertical ? 28 : 12 + 576 * progress;
          const cy = isVertical ? 12 + 216 * progress : 28;

          return (
            <circle
              key={`${point.label}-${index}`}
              cx={cx}
              cy={cy}
              r="3"
              fill="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <ol className="decision-trace__labels" aria-label={ariaLabel}>
        {points.map((point, index) => (
          <li
            key={`${point.label}-${index}`}
            className="decision-trace__point"
          >
            <span className="decision-trace__label">{point.label}</span>
            {point.detail ? (
              <span className="decision-trace__detail">{point.detail}</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
