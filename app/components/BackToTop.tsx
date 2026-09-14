"use client";

import { ArrowUp } from "lucide-react";
import type { MouseEvent } from "react";

export function BackToTop() {
  const returnToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;

    const main = document.getElementById("main");
    if (!main) return;
    event.preventDefault();
    history.replaceState(history.state, "", "#main");
    main.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <a
      className="footer-top"
      href="#main"
      aria-label="Back to top"
      onClick={returnToTop}
    >
      <span className="footer-top__label" aria-hidden="true">
        Back to top
      </span>
      <ArrowUp size={22} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}
