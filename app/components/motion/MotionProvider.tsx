"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * `domAnimation` is bundled rather than imported lazily.
 *
 * Every reveal on this page follows the same progressive-enhancement pattern:
 * render visible in server HTML with `initial={false}`, then set the hidden
 * state in a layout effect and let `whileInView` animate it in. With an async
 * feature import that layout effect ran *before* the animation feature
 * existed, so the hidden state was a no-op and never re-applied — the reveals
 * then animated from visible to visible, which is no animation at all.
 *
 * The feature set is a few kilobytes and the page has no route transitions to
 * amortise a second request against, so paying for it up front is the right
 * trade.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
