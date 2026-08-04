"use client";

import {
  m,
  useAnimationControls,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
} from "./tokens";
import { useRevealFallback } from "./useRevealFallback";

type HeroRevealElement = "div" | "header" | "section";
type HeroRevealItemElement = "div" | "h1" | "p" | "span" | "small";

const heroGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: MOTION_STAGGER,
      staggerChildren: MOTION_STAGGER,
    },
  },
};

const reducedGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { duration: 0, staggerChildren: 0 } },
};

const nameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_DISTANCE.editorial,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
    },
  },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.subtle },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
    },
  },
};

const reducedItemVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

/**
 * Progressive enhancement for the hero's authored reading order.
 *
 * Wrap each name line, the role, and the supporting copy in a
 * `HeroRevealItem`. Text remains in the server-rendered HTML and visible when
 * JavaScript is unavailable.
 *
 * This runs on mount rather than on view. The hero is above the fold by
 * definition, so a viewport observer bought nothing and added a step that
 * could fail — and the cost of that failure is the name, the statement and
 * both calls to action sitting invisible.
 */
export function HeroReveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: HeroRevealElement;
}) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);
  const MotionTag = m[as] as typeof m.div;
  const shouldReduce = reduce === true;

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  useEffect(() => {
    void controls.start("visible");
  }, [controls]);

  useRevealFallback(ref, controls, !shouldReduce);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={shouldReduce ? reducedGroupVariants : heroGroupVariants}
      initial={false}
      animate={controls}
    >
      {children}
    </MotionTag>
  );
}

export function HeroRevealItem({
  children,
  className,
  as = "div",
  kind = "copy",
}: {
  children: ReactNode;
  className?: string;
  as?: HeroRevealItemElement;
  kind?: "name" | "copy";
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      variants={
        reduce === true
          ? reducedItemVariants
          : kind === "name"
            ? nameVariants
            : copyVariants
      }
      initial={false}
    >
      {children}
    </MotionTag>
  );
}
