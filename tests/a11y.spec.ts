import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { BRIEF, CASE_STUDIES } from "../app/lib/content";
import { THEME_COLORS } from "../app/components/theme/theme";

const paths = [
  "/",
  "/approach",
  "/systems",
  "/profile",
  "/contact",
  ...CASE_STUDIES.map((item) => "/work/" + item.id),
];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function audit(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(TAGS)
    .analyze();
  const summary = violations.map(({ id, impact, help, nodes }) => ({
    id,
    impact,
    help,
    nodes: nodes.map((node) => node.target.join(" ")).slice(0, 5),
  }));
  expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
}

for (const theme of ["light", "dark"] as const) {
  for (const path of paths) {
    test(`${path} in ${theme}: readable landmarks and automated WCAG checks`, async ({
      page,
    }) => {
      await page.addInitScript(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expect(
        page.getByRole("navigation", { name: "Primary navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: "Skip to content" }),
      ).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("main#main")).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await audit(page);
      if (path === "/")
        await page.screenshot({
          path: test.info().outputPath("home.png"),
          fullPage: true,
          animations: "disabled",
        });
    });
  }
}

test("brief keyboard selection changes the visible panel", async ({ page }) => {
  await page.goto("/approach");
  const radios = page
    .getByRole("radiogroup", { name: "Fields of the brief" })
    .getByRole("radio");
  await expect(radios).toHaveCount(5);
  await radios.nth(0).focus();
  await page.keyboard.press("ArrowDown");
  await expect(radios.nth(1)).toBeFocused();
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");
  await expect(
    page.getByRole("region", { name: BRIEF.fields[1].title, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: BRIEF.fields[0].title, exact: true }),
  ).toBeHidden();
  await page.keyboard.press("End");
  await expect(radios.nth(4)).toBeFocused();
  await expect(
    page.getByRole("region", { name: BRIEF.fields[4].title, exact: true }),
  ).toContainText("A pilot that cannot be stopped");
  await page.keyboard.press("Home");
  await expect(radios.nth(0)).toBeFocused();
  await audit(page);
});

test("theme choice persists through page navigation and reload", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Profile", exact: true })
    .click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(
    page.getByRole("region", { name: "Now", exact: true }),
  ).toContainText("Syneos Health");
  await expect(page.locator("time").first()).toHaveText(/^\d{2}:\d{2}$/);
  await expect(
    page.getByText("Sean eternos los laureles que supimos conseguir.", {
      exact: true,
    }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.locator('meta[name="theme-color"]').first(),
  ).toHaveAttribute("content", THEME_COLORS.dark);
  // A manual light choice must also win over a dark operating system.
  await page.emulateMedia({ colorScheme: "dark" });
  await page
    .getByRole("button", { name: "Switch to light theme" })
    .press("Enter");
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(
    page.locator('meta[name="theme-color"]').first(),
  ).toHaveAttribute("content", THEME_COLORS.light);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("invalid saved themes follow live system changes", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "obsolete"));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Switch to light theme" }),
  ).toBeEnabled();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("blocked storage keeps system detection and the manual choice during navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage is disabled", "SecurityError");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Systems", exact: true })
    .click();
  await expect(page).toHaveURL(/\/systems$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});

test("theme changes synchronize between open tabs", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/contact");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(other.locator("html")).toHaveAttribute("data-theme", "dark");
  await other.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await other.close();
});

test("map connections never cross labels at desktop, narrow widths or enlarged text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, fontSize] of [
    [1440, 16],
    [1024, 16],
    [768, 16],
    [540, 16],
    [390, 16],
    [320, 16],
    [320, 32],
  ]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/");
    await page.evaluate((size) => {
      document.documentElement.style.fontSize = size + "px";
    }, fontSize);
    await expect(page.locator(".deployment-map")).toHaveAttribute(
      "data-enhanced",
      "true",
    );
    await page.evaluate(() => document.fonts.ready);
    // Observe the settled measured routes, not the initial no-JS illustration.
    const measuredViewBox = await page.locator(".map-graph").evaluate((el) => {
      const { width, height } = el.getBoundingClientRect();
      return `0 0 ${width} ${height}`;
    });
    await expect
      .poll(() => page.locator(".map-edges").getAttribute("viewBox"))
      .toBe(measuredViewBox);
    const issues = await page.evaluate(() => {
      const graph = document
        .querySelector(".map-graph")!
        .getBoundingClientRect();
      const labels = [...document.querySelectorAll(".map-node,.map-hub")].map(
        (node) => {
          const rect = node.getBoundingClientRect();
          return {
            name: node.textContent,
            x: rect.left - graph.left,
            y: rect.top - graph.top,
            r: rect.right - graph.left,
            b: rect.bottom - graph.top,
          };
        },
      );
      const errors: string[] = [];
      for (const path of document.querySelectorAll<SVGPathElement>(
        ".map-edges path",
      )) {
        const length = path.getTotalLength();
        for (let d = 0; d <= length; d += 2) {
          const p = path.getPointAtLength(d);
          for (const label of labels)
            if (
              p.x > label.x - 3 &&
              p.x < label.r + 3 &&
              p.y > label.y - 3 &&
              p.y < label.b + 3
            )
              errors.push("Path crosses " + label.name);
        }
      }
      for (let i = 0; i < labels.length; i++)
        for (let j = i + 1; j < labels.length; j++) {
          const a = labels[i],
            b = labels[j];
          if (a.x < b.r && a.r > b.x && a.y < b.b && a.b > b.y)
            errors.push("Label overlap: " + a.name + " / " + b.name);
        }
      if (document.documentElement.scrollWidth > innerWidth)
        errors.push("Horizontal overflow");
      return [...new Set(errors)];
    });
    expect(issues, `width=${width}, font=${fontSize}px`).toEqual([]);
    await expect(
      page.getByRole("button", { name: "Map view", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    if (width === 320)
      await page.screenshot({
        path: test.info().outputPath(`map-${fontSize}.png`),
        fullPage: true,
        animations: "disabled",
      });
  }
});

test("map selection, explicit list view, case navigation and legacy links work", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Digital Twin Studio", exact: true })
    .click();
  await expect(page.locator("#selected-digital-twin-studio")).toBeVisible();
  await expect(page.locator("#selected-ai-delivery")).toBeHidden();
  await page.getByRole("button", { name: "List view", exact: true }).click();
  await expect(page.locator(".deployment-map")).toHaveAttribute(
    "data-layout",
    "list",
  );
  await expect(
    page.getByRole("button", { name: "M&A", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Map view", exact: true }).click();
  await page
    .getByRole("link", { name: /Open case.*Digital Twin Studio/ })
    .click();
  await expect(page).toHaveURL(/\/work\/digital-twin-studio$/);
  await expect(
    page.getByText(CASE_STUDIES[1].summary, { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "← Back to the map" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  await page.goto("/#experience");
  await expect(page).toHaveURL(/\/profile$/);
});
