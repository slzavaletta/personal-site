"use client";

import {
  m,
  useAnimationControls,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import type { ReactElement, ReactNode } from "react";

import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
  MOTION_STAGGER_CAP,
} from "./tokens";
import { shouldStartHidden } from "./revealState";
import { useInViewOnce } from "./useInViewOnce";
import { useRevealFallback } from "./useRevealFallback";

const RULE_DURATION = 0.6;

const ruleVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: RULE_DURATION, ease: MOTION_EASE },
  },
};

const reducedRuleVariants: Variants = {
  hidden: { scaleY: 1 },
  visible: { scaleY: 1, transition: { duration: 0 } },
};

/**
 * The diamond is a `::before` on the row, so it cannot be targeted directly.
 * Motion animates a custom property instead and the pseudo-element reads it —
 * which also keeps the marker out of the rule's transform tree. A marker
 * nested inside a rule being scaled on Y renders as a squashed lozenge for
 * the whole draw.
 */
const rowVariants: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.editorial, "--diamond-scale": 0.4 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    "--diamond-scale": 1,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
      delay: Math.min(index, MOTION_STAGGER_CAP) * MOTION_STAGGER,
    },
  }),
};

const reducedRowVariants: Variants = {
  hidden: { opacity: 1, y: 0, "--diamond-scale": 1 },
  visible: {
    opacity: 1,
    y: 0,
    "--diamond-scale": 1,
    transition: { duration: 0 },
  },
};

/**
 * The vertical rule with its diamond markers is the most structural graphic on
 * the page, so it builds rather than appearing. The rule draws top to bottom
 * over 600ms and each marker lands as the rule passes it.
 */
export function TimelineTrace({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const inView = useInViewOnce(ref);
  const shouldReduce = reduce === true;

  useIsomorphicLayoutEffect(() => {
    if (shouldReduce) {
      controls.set("visible");
      return;
    }

    try {
      controls.set(shouldStartHidden(ref) ? "hidden" : "visible");
    } catch {
      controls.set("visible");
    }
  }, [controls, shouldReduce]);

  useEffect(() => {
    if (shouldReduce || inView) {
      void controls.start("visible");
    }
  }, [controls, inView, shouldReduce]);

  useRevealFallback(ref, controls, !shouldReduce);

  return (
    <m.ol
      ref={ref}
      aria-label={ariaLabel}
      className={["timeline-trace", className].filter(Boolean).join(" ")}
      initial={false}
      animate={controls}
    >
      <m.span
        aria-hidden="true"
        className="timeline-trace__rule"
        variants={shouldReduce ? reducedRuleVariants : ruleVariants}
      />
      {Children.map(children, (child, index) =>
        isValidElement<{ index?: number }>(child)
          ? cloneElement(child as ReactElement<{ index?: number }>, { index })
          : child,
      )}
    </m.ol>
  );
}

export function TimelineRow({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Injected by `TimelineTrace`; drives the capped per-row delay. */
  index?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <m.li
      className={className}
      custom={index}
      variants={reduce === true ? reducedRowVariants : rowVariants}
      initial={false}
    >
      {children}
    </m.li>
  );
}
