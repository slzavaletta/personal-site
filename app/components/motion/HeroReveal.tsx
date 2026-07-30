"use client";

import {
  m,
  useAnimationControls,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";

import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
} from "./tokens";

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
  const MotionTag = m[as];
  const shouldReduce = reduce === true;

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  return (
    <MotionTag
      className={className}
      variants={shouldReduce ? reducedGroupVariants : heroGroupVariants}
      initial={false}
      animate={controls}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
