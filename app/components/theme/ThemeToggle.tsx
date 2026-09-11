"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import {
  applyResolvedTheme,
  applyTheme,
  readStoredTheme,
  readTheme,
  syncThemePreference,
  THEME_STORAGE_KEY,
  type Theme,
} from "./theme";

/**
 * Two-state toggle over the system preference. The boot script has already
 * set `data-theme`, so this only needs to read it once mounted; before that
 * it renders a neutral label so the server HTML never guesses the scheme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Next can restore route metadata during client navigation.
    applyResolvedTheme(readTheme());
  }, [pathname]);

  useEffect(() => {
    const preference = document.documentElement.getAttribute(
      "data-theme-preference",
    );
    setTheme(
      syncThemePreference(
        preference === "light" || preference === "dark"
          ? preference
          : readStoredTheme(),
      ),
    );

    const media = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      if (
        document.documentElement.getAttribute("data-theme-preference") !==
        "system"
      )
        return;
      const next: Theme = media.matches ? "dark" : "light";
      applyResolvedTheme(next);
      setTheme(next);
    };
    const sync = (event: StorageEvent) => {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
      // Ignore sessionStorage; only the shared local preference is relevant.
      try {
        if (event.storageArea !== localStorage) return;
      } catch {
        return;
      }
      setTheme(syncThemePreference(readStoredTheme()));
    };
    media.addEventListener("change", follow);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", follow);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={["theme-toggle", className].filter(Boolean).join(" ")}
      disabled={theme === null}
      aria-label={
        theme ? `Switch to ${next} theme` : "Toggle light and dark theme"
      }
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" className="size-[1.125rem]" />
      ) : (
        <Moon aria-hidden="true" className="size-[1.125rem]" />
      )}
      <span aria-hidden="true">
        {theme ? (next === "dark" ? "Dark" : "Light") : "Theme"}
      </span>
    </button>
  );
}
