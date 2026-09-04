"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

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
import { LocalClock } from "@/app/components/LocalClock";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle";
import { SITE_NAME } from "@/app/lib/site";

export function SiteHeader({ initialClock }: { initialClock: string }) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.querySelector("#top");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const prepareMobileNavigationFocus = (href: string) => {
    const section = document.getElementById(href.slice(1));
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
      className="site-header sticky top-0 z-40 border-b border-rule-strong bg-paper data-[past-hero]:bg-paper/88 data-[past-hero]:backdrop-blur-md data-[past-hero]:backdrop-saturate-150"
    >
      <div className="flag-ribbon" aria-hidden="true" />
      <div className="page-shell flex min-h-16 items-center justify-between gap-6 sm:min-h-[4.25rem]">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href="#top"
            className="wordmark inline-flex min-h-11 items-center text-ink"
            aria-label={`${SITE_NAME}, back to top`}
          >
            <span className="sm:hidden">Santiago</span>
            <span className="hidden sm:inline">{SITE_NAME}</span>
          </a>
          <p className="figure hidden text-sm text-mute md:block">
            <LocalClock initial={initialClock} />
          </p>
        </div>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hairline-link inline-flex min-h-11 items-center text-sm font-bold tracking-[0.01em]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={SITE_LINKS.email}
            className="hairline-link hidden min-h-11 items-center px-2 text-sm font-bold md:inline-flex"
          >
            Email
          </a>

          <div className="lg:hidden">
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
                  <p className="utility-label">On this page</p>
                  <nav
                    aria-label="Mobile navigation"
                    className="mt-5 flex flex-col border-t border-rule-strong"
                  >
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => prepareMobileNavigationFocus(link.href)}
                        className="flex min-h-16 items-center border-b border-rule text-2xl font-semibold tracking-[-0.02em]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  <p className="figure mt-6 text-sm text-mute">
                    <LocalClock initial={initialClock} />
                  </p>
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
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
