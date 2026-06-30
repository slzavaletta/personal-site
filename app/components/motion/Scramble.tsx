"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$/<>*+=";

/**
 * One-time decode: characters cycle random glyphs, then settle left-to-right
 * into the final word. Re-triggers when it re-enters the viewport. Never loops
 * while idle. Under reduced motion it shows the settled word immediately.
 */
export function Scramble({
  text,
  duration = 600,
  startDelay = 0,
  className,
  settledClassName,
}: {
  text: string;
  duration?: number;
  startDelay?: number;
  className?: string;
  settledClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [settled, setSettled] = useState(true);
  const running = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      setSettled(true);
      return;
    }
    if (!inView) {
      running.current = false; // allow re-trigger on next entry
      return;
    }
    if (running.current) return;
    running.current = true;
    setSettled(false);

    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const revealed = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
          } else if (i < revealed) {
            out += text[i];
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
          setSettled(true);
        }
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduce, text, duration, startDelay]);

  return (
    <span
      ref={ref}
      className={settled ? settledClassName : className}
      aria-label={text}
    >
      {display}
    </span>
  );
}
