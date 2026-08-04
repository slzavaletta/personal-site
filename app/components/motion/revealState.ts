"use client";

import type { RefObject } from "react";

/**
 * Decides whether a reveal is allowed to start hidden.
 *
 * Everything here is hidden by JavaScript and shown by JavaScript, so the
 * hidden state is only ever applied when something is certain to be able to
 * undo it. Three ways that certainty fails:
 *
 * - `IntersectionObserver` is unavailable, so `whileInView` can never fire.
 * - The element is already on screen at load. A viewport callback may not
 *   report an element that is only partly in view, and if it is the last
 *   content in the document it may never report at all. This is what makes
 *   deep links and mid-page reloads work.
 * - The ref never attached.
 *
 * In all three the element stays visible, with no transition.
 */
export function shouldStartHidden(ref: RefObject<HTMLElement | null>) {
  if (typeof window === "undefined") return false;
  if (typeof IntersectionObserver === "undefined") return false;

  const element = ref.current;
  if (!element) return false;

  return element.getBoundingClientRect().top >= window.innerHeight;
}
