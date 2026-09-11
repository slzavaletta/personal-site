export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_COLORS = { light: "#F6F8FB", dark: "#0E192B" } as const;

/*
 * Runs inline in <head> before the first paint so a stored preference never
 * flashes the other scheme. A blocked storage read must not skip system
 * detection. The preference attribute also keeps a manual choice for this
 * document when the browser cannot persist it.
 */
export const THEME_BOOT_SCRIPT = `(function(){var s=null;try{s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}var p=(s==="light"||s==="dark")?s:"system";var t=p==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p;var r=document.documentElement;r.setAttribute("data-theme-preference",p);r.setAttribute("data-theme",t);var c=${JSON.stringify(THEME_COLORS)};document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c[t])});})();`;

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyResolvedTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // Browser chrome follows an explicit choice, even when it differs from OS.
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", THEME_COLORS[theme]);
  });
}

export function syncThemePreference(preference: Theme | null): Theme {
  document.documentElement.setAttribute(
    "data-theme-preference",
    preference ?? "system",
  );
  const theme =
    preference ??
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyResolvedTheme(theme);
  return theme;
}

export function applyTheme(theme: Theme) {
  syncThemePreference(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Private mode or storage disabled: the theme still applies for this visit. */
  }
}
