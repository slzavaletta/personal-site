"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 900;

/** Splits "10+ years" into "", 10, "+ years" — and "$5M" into "$", 5, "M". */
const PARTS = /^(\D*)(\d+(?:[.,]\d+)?)(.*)$/s;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a metric up on first entry into the viewport.
 *
 * The final string is what renders from the server and what a screen reader
 * reads; the animation only overwrites text that is already correct, so no-JS,
 * reduced motion and assistive technology all land on the right value without
 * any live-region announcement.
 *
 * The digits sit in a span with `min-width` reserved in `ch` for the *final*
 * number. `tabular-nums` equalises digit widths but reserves nothing for a
 * value that gains a digit on the way up, which is where the layout shift
 * would come from.
 */
export function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  const match = value.match(PARTS);
  const target = match ? Number(match[2].replace(",", ".")) : null;
  const decimals = match?.[2].includes(".") ? 1 : 0;

  /*
   * Only primitives in the dependency array. `value.match()` returns a fresh
   * array on every render, so listing it here tore the effect down and rebuilt
   * it on each tick of its own state — the observer re-fired, the count
   * restarted, and the number sat at zero forever.
   */
  useEffect(() => {
    if (target === null) return;

    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let settle = 0;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      const start = performance.now();

      const step = (now: number) => {
        /*
         * Clamped at both ends. A frame callback carries the timestamp of the
         * start of its frame, which can predate the `performance.now()` taken
         * here in the task that scheduled it — elapsed time comes out negative,
         * the ease returns a negative multiplier, and the metrics open on
         * "-0+ years" and "$-0M" before climbing.
         */
        const elapsed = Math.max(now - start, 0);
        const progress = Math.min(elapsed / DURATION, 1);
        setDisplay((easeOut(progress) * target).toFixed(decimals));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          setDisplay(null);
        }
      };

      frame = requestAnimationFrame(step);

      /*
       * A timer, not a frame, guarantees the ending. Backgrounding the tab
       * pauses `requestAnimationFrame`, which would strand the number at
       * whatever it had reached — and a metric frozen at "$0M" is worse than
       * one that never moved.
       */
      settle = window.setTimeout(() => {
        cancelAnimationFrame(frame);
        frame = 0;
        setDisplay(null);
      }, DURATION + 250);
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          observer?.disconnect();
          run();
        },
        { threshold: 0.4 },
      );
      observer.observe(element);
    } catch {
      /* Leave the final value in place. */
    }

    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (settle) window.clearTimeout(settle);
    };
  }, [decimals, target]);

  if (!match || target === null) return <>{value}</>;

  const [, prefix, digits, suffix] = match;

  return (
    <>
      {prefix}
      <span
        ref={ref}
        style={{
          display: "inline-block",
          minWidth: `${digits.length}ch`,
          // Reserved space sits to the left, so a single digit counting up
          // toward a two-digit total stays flush against whatever follows it
          // instead of drifting away from its own unit.
          textAlign: "right",
        }}
      >
        {display ?? digits}
      </span>
      {suffix}
    </>
  );
}
