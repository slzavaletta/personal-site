"use client";

import { useEffect } from "react";

/**
 * Lands a deep link on its section.
 *
 * Loading `/#experience` left the page at scrollY 5: the browser starts the
 * smooth scroll the hash asks for, then hydration interrupts it and it never
 * resumes. The anchor is silently dropped and the reader gets the hero.
 *
 * The jump runs instantly rather than smoothly — arriving at a deep link is not
 * a transition, and a second animated scroll after the page has already painted
 * reads as a glitch. `scrollIntoView` honours the target's `scroll-margin`, so
 * the sticky header keeps its clearance.
 *
 * It re-asserts on several signals instead of one. A single
 * `requestAnimationFrame` was enough on a fast local load and nothing else:
 * rAF is throttled while the tab is not painting, so a background restore or a
 * slow first load dropped the correction and reproduced the very bug this
 * fixes. Fonts get their own pass because the metric-matched swap reflows the
 * column and moves the target after the first jump has already landed.
 *
 * Any of those passes is abandoned the moment the reader scrolls themselves —
 * being yanked back to an anchor you have already left is worse than missing it.
 */
export function HashTarget() {
  useEffect(() => {
    /*
     * The fragment is untrusted input. It is looked up as an id, never run
     * through the selector engine, and only when it is shaped like one of the
     * ids this page authors — so a crafted URL cannot hand the browser a
     * pathological selector to evaluate.
     */
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!/^[A-Za-z][\w-]{0,63}$/.test(id)) return;

    const target = document.getElementById(id);
    if (!target) return;

    /*
     * On a reload or a back/forward the browser restores the reader's own
     * scroll position, and that is better intent than a hash they may have
     * scrolled past long ago — so leave it alone. It does not always manage
     * it, though: a reload of `/?v=r1#experience` from scrollY 2000 landed at
     * 0, keeping neither. So only stand back when a position was actually
     * restored; a restored top is indistinguishable from a dropped one, and
     * the hash is the better answer for both.
     *
     * A fresh navigation never yields: the failing case left the page at
     * scrollY 5, not 0, so "did the browser move us at all" is not a test that
     * can be trusted there.
     */
    const [entry] = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    const isRestorable = entry ? entry.type !== "navigate" : false;
    if (isRestorable && window.scrollY > 100) return;

    const element = target;
    let cancelled = false;

    const land = () => {
      if (cancelled) return;
      element.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const release = () => {
      cancelled = true;
    };

    /*
     * Only keys that move the viewport count as the reader leaving. Tab and
     * the arrow keys inside a control are navigation, not a scroll, and a
     * keyboard user who tabs once should still land on the anchor.
     */
    const SCROLL_KEYS = new Set([
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      "Home",
      "End",
      " ",
    ]);
    const releaseOnScrollKey = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) release();
    };

    // Layout is already computed by the time an effect runs, so this is the
    // pass that normally does the work; the rest are backstops.
    land();
    const frame = requestAnimationFrame(land);

    if (document.readyState !== "complete") {
      window.addEventListener("load", land);
    }
    void document.fonts?.ready.then(land);

    const releaseOptions = { passive: true, once: true } as const;
    window.addEventListener("wheel", release, releaseOptions);
    window.addEventListener("touchmove", release, releaseOptions);
    window.addEventListener("keydown", releaseOnScrollKey);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", land);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", releaseOnScrollKey);
    };
  }, []);

  return null;
}
