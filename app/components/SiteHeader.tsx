"use client";
import { SiteLink as Link } from "./PageNavigation";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/app/lib/content";
import { LocalClock } from "./LocalClock";
import { ThemeToggle } from "./theme/ThemeToggle";

export function SiteHeader({ initialClock }: { initialClock: string }) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const sentinel = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const bar = header.current;
    const marker = sentinel.current;
    if (!bar || !marker) return;
    const root = document.documentElement;
    const measure = () =>
      root.style.setProperty("--header-height", `${bar.offsetHeight}px`);
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(bar);
    // Observe a document marker, not the pinned header. No per-frame scroll work.
    const scroll = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "24px 0px 0px" },
    );
    scroll.observe(marker);
    return () => {
      resize.disconnect();
      scroll.disconnect();
      root.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <>
      <span ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header ref={header} className="site-header" data-scrolled={scrolled}>
        <div className="header-inner page-shell">
          <Link href="/" className="wordmark">
            Santiago
            <br />
            López Zavaletta
          </Link>
          <div className="header-clock">
            <LocalClock initial={initialClock} />
          </div>
          <nav aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname === link.href ||
                  (link.href === "/" && pathname.startsWith("/work/"))
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
