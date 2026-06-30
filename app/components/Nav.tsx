import { NAV_LINKS } from "@/app/lib/content";
import { CommandMenu } from "./CommandMenu";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-text"
        >
          <span
            aria-hidden="true"
            className="brand-dot inline-block h-2 w-2 rounded-full bg-accent"
          />
          slzavaletta
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <CommandMenu />
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-md bg-text px-4 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
