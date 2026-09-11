"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/app/lib/content";
import { LocalClock } from "./LocalClock";
import { ThemeToggle } from "./theme/ThemeToggle";

export function SiteHeader({ initialClock }: { initialClock: string }) {
  const pathname = usePathname();
  return (
    <header className="site-header page-shell">
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
    </header>
  );
}
