"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { AmbientField } from "./motion/AmbientField";
import { Scramble } from "./motion/Scramble";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pb-20 pt-24 sm:px-8"
    >
      {/* Ambient generative field, calm and low-contrast, slow drift */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AmbientField />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/10 to-bg" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1180px]">
        <div className="max-w-3xl">
          <motion.p
            {...enter(0.05)}
            className="font-mono text-sm tracking-tight text-muted"
          >
            Senior Project Manager <span className="text-faint">·</span> AI
            Delivery &amp; Program Management
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-text">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={reduce ? undefined : { y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              >
                Project Manager who{" "}
                <Scramble
                  text="builds."
                  duration={600}
                  startDelay={950}
                  className="text-accent"
                  settledClassName="text-gradient-builds"
                />
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...enter(0.45)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            I lead software and AI delivery across complex programs, and build
            the agentic tooling and infrastructure that runs them.
          </motion.p>

          <motion.div
            {...enter(0.6)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-medium text-bg transition-colors duration-150 hover:bg-accent-soft"
            >
              Get in touch
              <ArrowRight
                weight="bold"
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#lab"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-6 py-3 text-base font-medium text-text transition-colors duration-150 hover:border-muted"
            >
              See the Lab
              <ArrowDown
                weight="bold"
                className="size-4 text-muted transition-transform duration-150 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
