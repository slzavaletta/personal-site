"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { applyTheme, readTheme, type Theme } from "./theme";

/**
 * Two-state toggle over the system preference. The boot script has already
 * set `data-theme`, so this only needs to read it once mounted; before that
 * it renders a neutral label so the server HTML never guesses the scheme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());

    const media = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* fall through: nothing stored means follow the system */
      }
      const next: Theme = media.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={["theme-toggle", className].filter(Boolean).join(" ")}
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
    </button>
  );
}
