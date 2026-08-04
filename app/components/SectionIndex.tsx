"use client";

import { useEffect, useState } from "react";

import { SECTION_INDEX } from "@/app/lib/content";

/**
 * A compact index in the left gutter, marking the reader's position.
 *
 * It duplicates nothing: the top navigation stays exactly as it is, and this
 * reuses the page's own numbered kicker spine so the two can never disagree
 * about order. Wide screens only — below 1280px the shell fills the viewport
 * and there is no gutter to put it in.
 */
export function SectionIndex() {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [overHero, setOverHero] = useState(true);
  /*
   * Ships hidden so the index never flashes over the name on load, and clears
   * once the observers are running. Without JavaScript it stays set, which a
   * `<noscript>` rule in the head undoes — the links still work there, they
   * just cannot track position.
   */
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observers: IntersectionObserver[] = [];

    setPending(false);

    try {
      const hero = document.querySelector("#top");
      if (hero) {
        const heroObserver = new IntersectionObserver(
          ([entry]) => setOverHero(entry.isIntersecting),
          { rootMargin: "-120px 0px 0px 0px" },
        );
        heroObserver.observe(hero);
        observers.push(heroObserver);
      }

      // The section whose top most recently crossed the upper third wins.
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHref(`#${entry.target.id}`);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );

      SECTION_INDEX.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) spy.observe(section);
      });
      observers.push(spy);
    } catch {
      /* No index rather than a broken one; the top navigation still works. */
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="section-index"
      data-pending={pending || undefined}
      data-over-hero={overHero || undefined}
    >
      <ol>
        {SECTION_INDEX.map((section) => {
          const active = section.href === activeHref;

          return (
            <li key={section.href}>
              <a
                href={section.href}
                aria-current={active ? "location" : undefined}
                className="section-index__link"
              >
                <span aria-hidden="true" className="section-index__rule" />
                <span className="section-index__number">{section.number}</span>
                <span className="section-index__label">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
