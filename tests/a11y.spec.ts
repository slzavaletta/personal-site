import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function audit(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const summary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map((node) => node.target.join(" ")).slice(0, 5),
  }));
  expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
}

async function open(page: Page, theme?: "light" | "dark") {
  if (theme) {
    await page.addInitScript((value) => {
      localStorage.setItem("theme", value);
    }, theme);
  }
  await page.goto("/");
  // Let the hero entrance finish so nothing is mid-transition when axe reads it.
  await page.waitForTimeout(1400);
}

test.describe("accessibility", () => {
  test("light theme has no WCAG 2.2 AA violations", async ({ page }) => {
    await open(page, "light");
    await audit(page);
  });

  test("dark theme has no WCAG 2.2 AA violations", async ({ page }) => {
    await open(page, "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await audit(page);
  });

  test("document structure: one h1, landmarks, skip link", async ({ page }) => {
    await open(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    const skip = page.getByRole("link", { name: "Skip to content" });
    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
  });

  test("no horizontal overflow", async ({ page }) => {
    await open(page);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});

test.describe("brief instrument", () => {
  test("is a keyboard-operable radio group that drives the panel", async ({
    page,
  }) => {
    await open(page);
    const group = page.getByRole("radiogroup", { name: "Fields of the brief" });
    const radios = group.getByRole("radio");
    await expect(radios).toHaveCount(5);
    await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");

    await radios.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");

    await page.keyboard.press("End");
    await expect(radios.nth(4)).toHaveAttribute("aria-checked", "true");

    const panel = page.getByRole("region", { name: /The decision/ });
    await expect(panel).toContainText("A pilot that cannot be stopped");
  });
});

test.describe("living layer", () => {
  test("ledger renders the role transition and a clock", async ({ page }) => {
    await open(page);
    const ledger = page
      .getByRole("region", { name: "Now" })
      .or(page.locator("section[aria-labelledby='ledger-heading']"));
    await expect(ledger.first()).toContainText("Syneos Health");
    await expect(ledger.first()).toContainText("Availability");
    await expect(page.locator("time").first()).toHaveText(/^\d{2}:\d{2}$/);
  });

  test("theme toggle switches and persists", async ({ page }) => {
    await open(page);
    const html = page.locator("html");
    const before = await html.getAttribute("data-theme");
    const after = before === "dark" ? "light" : "dark";

    await page
      .getByRole("button", { name: `Switch to ${after} theme` })
      .click();
    await expect(html).toHaveAttribute("data-theme", after);

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", after);
  });
});
