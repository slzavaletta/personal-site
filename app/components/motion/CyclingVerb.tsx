"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz";

/**
 * Cycles a verb through a list with a decode/settle transition. Advances only
 * while in view (pauses off-screen, never moves while idle off-screen). Under
 * reduced motion it shows the first verb, fixed. Renders inline so the rest of
 * the sentence sits immediately after it and reflows as the word length changes.
 */
export function CyclingVerb({
  words,
  interval = 3800,
  decodeMs = 520,
  className = "",
}: {
  words: string[];
  interval?: number;
  decodeMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 1 });
  const reduce = useReducedMotion();
  const [text, setText] = useState(words[0]);
  const index = useRef(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let cancelled = false;
    let raf = 0;

    const decodeTo = (target: string) => {
      const from = performance.now();
      const tick = (t: number) => {
        if (cancelled) return;
        const p = Math.min((t - from) / decodeMs, 1);
        const revealed = Math.floor(p * target.length);
        let out = "";
        for (let i = 0; i < target.length; i++) {
          out +=
            i < revealed
              ? target[i]
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setText(target);
      };
      raf = requestAnimationFrame(tick);
    };

    const timer = setInterval(() => {
      index.current = (index.current + 1) % words.length;
      decodeTo(words[index.current]);
    }, interval);

    return () => {
      cancelled = true;
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduce, words, interval, decodeMs]);

  return (
    <span ref={ref} className={className} aria-label={words[0]}>
      {reduce ? words[0] : text}
    </span>
  );
}
