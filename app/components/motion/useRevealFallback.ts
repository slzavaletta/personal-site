"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import type { AnimationControls } from "motion/react";

const FALLBACK_DELAY = 600;

/**
 * A backstop for reveals that are hidden by JavaScript and shown by
 * JavaScript.
 *
 * If the reveal never fires — a stalled bundle, a crawler that runs scripts
 * but not observers, a viewport callback that silently does nothing — anything
 * already on screen would sit invisible with no way back. After a beat this
 * forces those elements to their visible state.
 *
 * Elements below the fold are deliberately left alone: they are *supposed* to
 * be hidden, and their reveal is still ahead of them. Anything already part
 * way through its reveal is left alone too — only a flat zero counts as
 * "never started".
 *
 * It `set`s rather than `start`s: the goal is to guarantee the content is
 * readable, and an animation would need a frame loop, which is exactly what
 * may not be running.
 */
export function useRevealFallback(
  ref: RefObject<HTMLElement | null>,
  controls: AnimationControls,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const timer = window.setTimeout(() => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (!onScreen) return;

      /*
       * A group wrapper carries no opacity of its own — its children do — so
       * fall through to the first child before deciding nothing happened.
       */
      const opacityOf = (node: Element) =>
        parseFloat(window.getComputedStyle(node).opacity);
      const probe =
        opacityOf(element) === 0 ? element : element.firstElementChild;

      if (!probe || opacityOf(probe) !== 0) return;

      controls.set("visible");

      /*
       * `set` does not re-propagate a variant to child components, so a group
       * wrapper would leave its children hidden. Clear what the reveal wrote
       * and let the stylesheet take over — this is a last resort, and its one
       * job is that the words end up on screen.
       */
      element
        .querySelectorAll<HTMLElement>('[style*="opacity: 0"]')
        .forEach((node) => {
          node.style.removeProperty("opacity");
          node.style.removeProperty("transform");
        });
    }, FALLBACK_DELAY);

    return () => window.clearTimeout(timer);
  }, [controls, enabled, ref]);
}
