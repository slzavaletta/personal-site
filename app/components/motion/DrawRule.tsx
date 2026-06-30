"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A thin accent rule that draws in (scaleX 0 -> 1 from the left) on scroll-in.
 * Static (full width) under reduced motion.
 */
export function DrawRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left bg-gradient-to-r from-accent/45 via-accent/25 to-accent/45 ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
