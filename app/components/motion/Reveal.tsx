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

type RevealElement =
  "div" | "section" | "li" | "article" | "header" | "footer" | "aside";

/**
 * A restrained, one-time reveal for the few sections that need reading-order
 * emphasis. `initial={false}` keeps server-rendered content visible before
 * hydration; Motion only adds the hidden state once the client is ready, and
 * only when `shouldStartHidden` confirms something can take it back off.
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
  const inView = useInViewOnce(ref);
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

  /*
   * An observer driving the controls, rather than `whileInView` alongside
   * them. A `while` gesture does not take over an `animate` prop that is an
   * imperative controller, so the pair silently never revealed anything the
   * reader scrolled to — only content already on screen, rescued by the
   * fallback below, ever appeared. The library's own `useInView` did not fire
   * here either; `useInViewOnce` is a plain observer and does.
   */
  useEffect(() => {
    if (shouldReduce || inView) {
      void controls.start("visible");
    }
  }, [controls, inView, shouldReduce]);

  useRevealFallback(ref, controls, !shouldReduce);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial={false}
      animate={controls}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: {},
};

/**
 * The delay is per item rather than `staggerChildren` so it can be capped:
 * past the sixth sibling every item shares the same offset, and a long list
 * never has a visibly late arrival.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.editorial },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.editorial,
      ease: MOTION_EASE,
      delay: Math.min(index, MOTION_STAGGER_CAP) * MOTION_STAGGER,
    },
  }),
};

const reducedGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { duration: 0 } },
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
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);
  const MotionTag = m[as] as typeof m.div;
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
    <MotionTag
      ref={ref}
      className={className}
      variants={shouldReduce ? reducedGroupVariants : groupVariants}
      initial={false}
      animate={controls}
    >
      {Children.map(children, (child, index) =>
        isValidElement<{ index?: number }>(child)
          ? cloneElement(child as ReactElement<{ index?: number }>, { index })
          : child,
      )}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** Injected by `Stagger`; drives the capped per-item delay. */
  index?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      className={className}
      custom={index}
      variants={reduce === true ? reducedItemVariants : itemVariants}
      initial={false}
    >
      {children}
    </MotionTag>
  );
}
