"use client";

import { useEffect, useRef, useState } from "react";
import type { AssemblyController } from "./scene/assembly";

/** The document is complete before this optional, decorative enhancement. */
export function DeliveryAssembly({
  field = -1,
  compact = false,
}: {
  field?: number;
  compact?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<AssemblyController | null>(null);
  const currentField = useRef(field);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    currentField.current = field;
    controller.current?.select(field);
  }, [field]);

  useEffect(() => {
    const element = host.current;
    if (!element || !window.IntersectionObserver) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inView = false;
    let generation = 0;
    let disposed = false;
    let failed = false;

    const stop = () => {
      generation++;
      controller.current?.dispose();
      controller.current = null;
      if (!disposed) setReady(false);
    };
    const sync = async () => {
      stop();
      if (
        disposed ||
        failed ||
        !inView ||
        document.hidden ||
        !motion.matches ||
        !desktop.matches ||
        connection?.saveData
      )
        return;
      const ticket = generation;
      try {
        const { createAssembly } = await import("./scene/assembly");
        if (disposed || generation !== ticket) return;
        controller.current = createAssembly(
          element,
          currentField.current,
          () => {
            failed = true;
            stop();
          },
        );
        setReady(true);
      } catch {
        failed = true;
        stop();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        void sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    motion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      className={`assembly${compact ? "assembly--compact" : ""}`}
      data-ready={ready}
      aria-hidden="true"
    >
      {/* Always available: no JS, touch, data saving, reduced motion, or no WebGL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="assembly__poster"
        src="/art/delivery-assembly.webp"
        alt=""
        width={960}
        height={960}
        loading={compact ? "lazy" : "eager"}
        decoding="async"
      />
      <div ref={host} className="assembly__canvas" />
      <div className="assembly__index">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} data-active={field === i}>
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
