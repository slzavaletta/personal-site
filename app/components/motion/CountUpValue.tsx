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

  useEffect(() => {
    if (target === null || !match) return;

    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        setDisplay(
          (easeOut(progress) * target).toFixed(decimals),
        );
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          setDisplay(null);
        }
      };

      frame = requestAnimationFrame(step);
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
    };
  }, [decimals, match, target]);

  if (!match || target === null) return <>{value}</>;

  const [, prefix, digits, suffix] = match;

  return (
    <>
      {prefix}
      <span
        ref={ref}
        style={{ display: "inline-block", minWidth: `${digits.length}ch` }}
      >
        {display ?? digits}
      </span>
      {suffix}
    </>
  );
}
