"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline under the navigation that fills with scroll depth.
 *
 * The CSS path is a scroll-driven animation, which runs off the main thread.
 * `scroll(root block)` is named explicitly rather than bare `scroll()`: the
 * bare form resolves to the nearest scroll container, and this rule lives
 * inside a sticky header that is out of the document scroller's flow, so it
 * would silently never advance.
 *
 * The JS path is the fallback for browsers without scroll-driven animations —
 * one passive listener, one transform write per frame.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const supportsScrollTimeline =
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline", "scroll(root block)");

    if (supportsScrollTimeline) return;

    element.dataset.fallback = "";
    let frame = 0;

    const write = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      element.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" className="scroll-progress" />;
}
