"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion } from "motion/react";

/**
 * Low-contrast generative dot matrix, mono, calm and ambient (a la Aman Khan).
 * A slow wave + drift animates it; near a fine pointer, dots brighten and part
 * slightly (input-driven, low amplitude). Pointer position is held in motion
 * values and read inside the rAF loop, so it never triggers a React re-render.
 * Under prefers-reduced-motion it renders ONE static frame. On coarse / no
 * pointer it keeps the ambient drift without cursor reactivity.
 */
export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  // pointer position in CSS px relative to the canvas; -9999 = absent
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 26;
    const BASE = 0.1; // clearly visible against #0C0C0C, not loud
    const AMP = 0.07;
    const REACH = 165; // px radius of cursor influence
    const PUSH = 11; // px max displacement
    const LIFT = 0.45; // max opacity boost near cursor
    const GLOW_BLUR = 16; // px max accent-green halo blur at the cursor
    const GLOW_ALPHA = 0.7; // max halo intensity at the cursor
    const TINT = 0.4; // green tint blended into a dot (core stays visible)
    const POS_LERP = 0.045; // even more viscous trailing of the influence point
    const PRES_LERP = 0.03; // even slower fade of cursor influence in/out
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let running = true;
    // smoothed influence point + presence (closure vars, never React state)
    let sx = -9999;
    let sy = -9999;
    let pres = 0;

    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      cols = Math.ceil(rect.width / GAP) + 1;
      rows = Math.ceil(rect.height / GAP) + 1;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = t * 0.00015; // even slower base clock = calmer field
      const r = 1.35 * dpr;
      const gap = GAP * dpr;
      // even longer-period ambient drift (pacing, not amplitude)
      const driftX = Math.sin(time * 0.32) * 7 * dpr;
      const driftY = Math.cos(time * 0.24) * 5 * dpr;

      const reach = REACH * dpr;
      // viscous, trailing influence point smoothed toward the raw pointer
      const present = fine && px.get() > -9000;
      if (present) {
        const tx = px.get() * dpr;
        const ty = py.get() * dpr;
        if (sx < -9000) {
          sx = tx; // snap on first appearance, then ease
          sy = ty;
        } else {
          sx += (tx - sx) * POS_LERP;
          sy += (ty - sy) * POS_LERP;
        }
      }
      pres += ((present ? 1 : 0) - pres) * PRES_LERP;
      const active = pres > 0.002 && sx > -9000;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let dotX = x * gap + driftX;
          let dotY = y * gap + driftY;
          const wave = Math.sin(x * 0.35 + y * 0.22 - time * 1.1); // even slower wave
          let op = BASE + AMP * (wave * 0.5 + 0.5);
          let glow = 0;

          if (active) {
            const ddx = dotX - sx;
            const ddy = dotY - sy;
            const dist = Math.hypot(ddx, ddy);
            if (dist < reach && dist > 0.001) {
              const lin = 1 - dist / reach;
              const f = lin * lin * (3 - 2 * lin) * pres; // smoothstep * presence
              op += LIFT * f;
              const shift = (PUSH * dpr * f) / dist;
              dotX += ddx * shift;
              dotY += ddy * shift;
              glow = f;
            }
          }

          if (glow > 0.002) {
            // soft accent-green halo + slight green tint, both fall off with distance
            ctx.shadowBlur = GLOW_BLUR * glow * dpr;
            ctx.shadowColor = `rgba(63, 185, 80, ${(GLOW_ALPHA * glow).toFixed(3)})`;
            const m = TINT * glow;
            const cr = Math.round(250 + (63 - 250) * m);
            const cg = Math.round(250 + (185 - 250) * m);
            const cb = Math.round(250 + (80 - 250) * m);
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${Math.min(op, 0.85).toFixed(3)})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            ctx.fillStyle = `rgba(250, 250, 250, ${Math.min(op, 0.75).toFixed(3)})`;
          }

          ctx.beginPath();
          ctx.arc(dotX, dotY, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // reset shadow so nothing else inherits it
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      // once the cursor is gone and influence has faded, allow a fresh snap next time
      if (!present && pres < 0.01) {
        sx = -9999;
        sy = -9999;
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = 1.35 * dpr;
      const gap = GAP * dpr;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          ctx.beginPath();
          ctx.arc(x * gap, y * gap, r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(250, 250, 250, 0.1)";
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();

    if (reduce) {
      drawStatic();
      const onResize = () => {
        resize();
        drawStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // pointer tracking via motion values (no React state, no re-render)
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px.set(e.clientX - rect.left);
      py.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      px.set(-9999);
      py.set(-9999);
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("blur", onLeave);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (fine) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("blur", onLeave);
      }
    };
  }, [reduce, px, py]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
