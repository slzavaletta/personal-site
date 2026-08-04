"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_LINKS } from "@/app/lib/content";

export function SiteHeader() {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationTargetRef = useRef<HTMLElement | null>(null);

  /*
   * The page runs to ten screens, so the header stays available. It only takes
   * on a rule and a hairline shadow once it is actually floating over content;
   * against the hero it sits flush.
   *
   * An observer rather than a scroll listener: it keeps the work off the main
   * thread and matches how the rest of the page detects entry. If it never
   * fires the header simply stays flush, which is the harmless state.
   */
  useEffect(() => {
    const hero = document.querySelector("#top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const prepareMobileNavigationFocus = (href: string) => {
    const section = document.querySelector<HTMLElement>(href);
    const target =
      section?.querySelector<HTMLElement>("h2, h3") ?? section ?? null;

    if (target) {
      target.tabIndex = -1;
    }

    mobileNavigationTargetRef.current = target;
    setMobileNavigationOpen(false);
  };

  return (
    <header
      data-past-hero={pastHero || undefined}
      className="site-header sticky top-0 z-40 border-b border-rule-strong bg-paper data-[past-hero]:bg-paper/80 data-[past-hero]:backdrop-blur-md data-[past-hero]:backdrop-saturate-150"
    >
      <div className="page-shell flex min-h-20 items-center justify-between gap-6">
        <a
          href="#top"
          className="group inline-flex min-h-11 min-w-11 items-center gap-3 text-ink"
          aria-label="SLZ — Santiago López Zavaletta, back to top"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center border border-ink font-heading text-sm font-bold tracking-[-0.08em] transition-colors duration-150 ease-editorial group-hover:bg-ink group-hover:text-paper"
          >
            SLZ
          </span>
          <span
            aria-hidden="true"
            className="hidden whitespace-nowrap font-mono text-[0.875rem] font-medium tracking-[0.08em] uppercase sm:block md:hidden lg:block"
          >
            Buenos Aires / AR
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hairline-link inline-flex min-h-11 min-w-11 items-center justify-center font-mono text-[0.875rem] font-medium tracking-[0.08em] uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE_LINKS.email}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 font-mono text-[0.875rem] font-medium tracking-[0.08em] text-foreground uppercase transition-colors duration-150 ease-editorial hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
          >
            Email Santiago
            <Mail aria-hidden="true" className="size-3.5" />
          </a>
        </nav>

        <div className="md:hidden">
          <Sheet
            open={mobileNavigationOpen}
            onOpenChange={(open) => {
              if (open) {
                mobileNavigationTargetRef.current = null;
              }
              setMobileNavigationOpen(open);
            }}
          >
            <SheetTrigger
              render={
                <Button
                  ref={mobileTriggerRef}
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              finalFocus={() =>
                mobileNavigationTargetRef.current ?? mobileTriggerRef.current
              }
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Jump to a section or email Santiago.
                </SheetDescription>
              </SheetHeader>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pt-16">
                <p className="utility-label text-graphite">On this page</p>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-5 flex flex-col border-t border-rule-strong"
                >
                  {NAV_LINKS.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => prepareMobileNavigationFocus(link.href)}
                      className="flex min-h-16 items-center justify-between border-b border-rule text-2xl font-semibold tracking-[-0.035em]"
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[0.875rem] font-medium text-signal-ink"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="shrink-0 border-t border-rule-strong p-5">
                <a
                  href={SITE_LINKS.email}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full",
                  )}
                >
                  Email Santiago
                  <Mail data-icon="inline-end" aria-hidden="true" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
