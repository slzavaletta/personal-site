"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const REST = 100;
/** Width once the header has taken over the top of the viewport. */
const SCROLLED = 86;
/** Widest a line gets with the pointer resting on it. */
const NEAR_POINTER = 110;
/** How long the CSS entrance runs before the script takes the axis over. */
const ENTRANCE_MS = 1150;

/**
 * The name, set line by line in Archivo with its width axis alive.
 *
 * The CSS entrance settles each line from condensed to its resting width.
 * After it, this script writes `--name-wdth` per line: the whole name
 * narrows as the reader scrolls it under the header, and on pointer devices
 * the line nearest the cursor opens up. Values are eased with a lerp so the
 * type never snaps, and the loop stops the moment everything has settled.
 *
 * Reduced motion: the script never starts and the lines sit at their rest
 * width. Without JavaScript: same.
 */
export function KineticName({
  lines,
  ariaLabel,
  className,
}: {
  lines: readonly string[];
  ariaLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(
      root.querySelectorAll<HTMLElement>("[data-kinetic]"),
    );
    if (!spans.length) return;

    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const targets = spans.map(() => REST);
    const current = spans.map(() => REST);
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let running = false;

    const compute = () => {
      const heroDepth = Math.max(1, root.offsetTop + root.offsetHeight);
      const scrolled = Math.min(1, Math.max(0, window.scrollY / heroDepth));
      const base = REST - (REST - SCROLLED) * scrolled;

      spans.forEach((span, index) => {
        let target = base;
        if (pointer && fine) {
          const box = span.getBoundingClientRect();
          const nearestX = Math.min(Math.max(pointer.x, box.left), box.right);
          const dx = (pointer.x - nearestX) / Math.max(1, box.height);
          const dy = (pointer.y - (box.top + box.height / 2)) / box.height;
          const distance = Math.min(1, Math.hypot(dx, dy) / 1.6);
          const proximity = (1 - distance) * (1 - distance);
          target += (NEAR_POINTER - REST) * proximity;
        }
        targets[index] = Math.min(125, Math.max(62, target));
      });
    };

    const tick = () => {
      let settled = true;
      spans.forEach((span, index) => {
        const next = current[index] + (targets[index] - current[index]) * 0.16;
        if (Math.abs(targets[index] - next) > 0.05) settled = false;
        current[index] = next;
        span.style.setProperty("--name-wdth", next.toFixed(2));
      });
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      compute();
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => schedule();
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    let attached = false;
    const start = window.setTimeout(() => {
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      if (fine) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
      schedule();
    }, ENTRANCE_MS);

    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(frame);
      if (!attached) return;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h1 ref={ref} className={className} aria-label={ariaLabel}>
      {lines.map((line, index) => (
        <span
          key={line}
          data-kinetic=""
          className="display-name__line"
          style={{ "--i": index } as CSSProperties}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}
