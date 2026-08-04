"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * Fires once, when the element has come comfortably into view.
 *
 * A plain observer rather than the library's `useInView`, which does not fire
 * in this app — the reveals it drove never ran, and only content already on
 * screen at load ever appeared.
 *
 * `rootMargin` rather than a threshold: a section taller than the viewport can
 * never reach a fractional threshold, so it would stay hidden forever. This
 * triggers when the element's top crosses the last tenth of the viewport,
 * which behaves the same whatever the element's height.
 *
 * If observers are unavailable the element is treated as in view immediately —
 * nothing here is allowed to leave content invisible.
 */
export function useInViewOnce(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let observer: IntersectionObserver | undefined;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          setInView(true);
          observer?.disconnect();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(element);
    } catch {
      setInView(true);
    }

    return () => observer?.disconnect();
  }, [ref]);

  return inView;
}
