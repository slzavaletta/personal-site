"use client";

import {
  m,
  useAnimationControls,
  useInView,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef } from "react";

import { MOTION_DURATION, MOTION_EASE } from "./tokens";
import { useRevealFallback } from "./useRevealFallback";

export type DecisionTraceField = {
  number: string;
  title: string;
  prompt: string;
};

type DecisionTraceProps = {
  fields: readonly DecisionTraceField[];
  className?: string;
  ariaLabel?: string;
};

const traceVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
    },
  },
};

const reducedTraceVariants: Variants = {
  hidden: { scaleY: 1 },
  visible: { scaleY: 1, transition: { duration: 0 } },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.standard, ease: MOTION_EASE },
  },
};

const reducedListVariants: Variants = {
  hidden: {},
  visible: { transition: { duration: 0, staggerChildren: 0 } },
};

const reducedFieldVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * The five fields of the pilot decision brief, set as the document they
 * describe: a ruled form with the trace drawn down its margin.
 *
 * The trace is a vertical rule scaled on the Y axis rather than an SVG
 * pathLength trace, which renders with gaps in some browsers once the viewBox
 * is stretched. It reads as the spine of one document, not as a five-step
 * process diagram — the fields are read in order, but they are not stages.
 *
 * The ordered list is the accessible source of truth and is always present in
 * server-rendered HTML; `initial={false}` keeps it visible before hydration.
 */
export function DecisionTrace({
  fields,
  className,
  ariaLabel = "Decision brief fields",
}: DecisionTraceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const shouldReduce = reduce === true;

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  useEffect(() => {
    if (shouldReduce || inView) {
      void controls.start("visible");
    }
  }, [controls, inView, shouldReduce]);

  useRevealFallback(containerRef, controls, !shouldReduce);

  return (
    <div
      ref={containerRef}
      className={["decision-brief", className].filter(Boolean).join(" ")}
    >
      <m.span
        aria-hidden="true"
        className="decision-brief__trace"
        variants={shouldReduce ? reducedTraceVariants : traceVariants}
        initial={false}
        animate={controls}
      />

      <m.ol
        className="decision-brief__fields"
        aria-label={ariaLabel}
        variants={shouldReduce ? reducedListVariants : listVariants}
        initial={false}
        animate={controls}
      >
        {fields.map((field) => (
          <m.li
            key={field.number}
            className="decision-brief__field"
            variants={shouldReduce ? reducedFieldVariants : fieldVariants}
          >
            <span className="decision-brief__number">{field.number}</span>
            <span className="decision-brief__title">{field.title}</span>
            <span className="decision-brief__prompt">{field.prompt}</span>
          </m.li>
        ))}
      </m.ol>
    </div>
  );
}
