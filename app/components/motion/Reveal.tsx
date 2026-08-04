"use client";

import {
  m,
  useAnimationControls,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
} from "./tokens";
import { useRevealFallback } from "./useRevealFallback";

type RevealElement =
  | "div"
  | "section"
  | "li"
  | "article"
  | "header"
  | "footer"
  | "aside";

/**
 * A restrained, one-time reveal for the few sections that need reading-order
 * emphasis. `initial={false}` keeps server-rendered content visible before
 * hydration; Motion only adds the hidden state once the client is ready.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealElement;
}) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);
  const MotionTag = m[as] as typeof m.div;
  const shouldReduce = reduce === true;

  const variants: Variants = shouldReduce
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: MOTION_DISTANCE.editorial },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: MOTION_DURATION.editorial,
            ease: MOTION_EASE,
            delay: Math.max(0, delay),
          },
        },
      };

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  useRevealFallback(ref, controls, !shouldReduce);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial={false}
      animate={controls}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION_STAGGER },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.editorial },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
    },
  },
};

const reducedGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { duration: 0, staggerChildren: 0 } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * A compact stagger for related evidence, not a generic page-wide effect.
 * Use only with direct `StaggerItem` descendants.
 */
export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);
  const MotionTag = m[as] as typeof m.div;
  const shouldReduce = reduce === true;

  useIsomorphicLayoutEffect(() => {
    controls.set(shouldReduce ? "visible" : "hidden");
  }, [controls, shouldReduce]);

  useRevealFallback(ref, controls, !shouldReduce);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={shouldReduce ? reducedGroupVariants : groupVariants}
      initial={false}
      animate={controls}
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      variants={reduce === true ? reducedItemVariants : itemVariants}
      initial={false}
    >
      {children}
    </MotionTag>
  );
}
