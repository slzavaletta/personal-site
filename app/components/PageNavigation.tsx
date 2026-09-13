"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";

type Navigation = {
  href: string;
  resolve?: () => void;
  timer?: ReturnType<typeof setTimeout>;
  transition?: ViewTransition;
};
const NavigationContext = createContext<
  ((href: string, replace?: boolean) => void) | null
>(null);

/** Animate committed pages; leave hashes, modified clicks and history native. */
export function PageNavigation({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<Navigation | null>(null);

  useLayoutEffect(() => {
    const task = pending.current;
    if (!task || task.href !== pathname) return;
    // Next's default scroll target is below the header. Reveal the whole screen.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
    clearTimeout(task.timer);
    task.resolve?.();
    pending.current = null;
    if (
      !task.transition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelector(".route-content")?.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }
  }, [pathname]);

  useEffect(() => {
    const cancel = () => {
      const task = pending.current;
      pending.current = null;
      clearTimeout(task?.timer);
      task?.transition?.skipTransition();
      task?.resolve?.();
    };
    window.addEventListener("popstate", cancel);
    return () => {
      cancel();
      window.removeEventListener("popstate", cancel);
    };
  }, []);

  const navigate = (href: string, replace = false) => {
    const previous = pending.current;
    clearTimeout(previous?.timer);
    previous?.transition?.skipTransition();
    previous?.resolve?.();
    pending.current = null;
    if (href === pathname) return;
    const task: Navigation = { href };
    pending.current = task;
    const commit = () =>
      replace
        ? router.replace(href, { scroll: false })
        : router.push(href, { scroll: false });
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      commit();
      return;
    }
    task.transition = document.startViewTransition(() => {
      if (pending.current !== task) return;
      return new Promise<void>((resolve) => {
        task.resolve = resolve;
        // A slow or failed response must never hold a frozen snapshot forever.
        task.timer = setTimeout(() => {
          task.transition?.skipTransition();
          resolve();
        }, 2500);
        commit();
      });
    });
    // Skipped transitions reject ready; navigation must still complete.
    void task.transition.ready.catch(() => {});
    void task.transition.finished.catch(() => {});
  };

  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
}

type SiteLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onNavigate"
> & { href: string };
export function SiteLink({ href, replace, ...props }: SiteLinkProps) {
  const navigate = useContext(NavigationContext);
  return (
    <Link
      {...props}
      href={href}
      replace={replace}
      onNavigate={(event) => {
        if (!navigate || !/^\/(?!\/)[^?#]*$/.test(href)) return;
        event.preventDefault();
        navigate(href, replace);
      }}
    />
  );
}
