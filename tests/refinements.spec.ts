import { expect, test } from "@playwright/test";
import { ANTHEM, PROOF_LINE, WORK_INTRO } from "../app/lib/content";
import { SITE_NAME } from "../app/lib/site";

for (const mode of ["native", "fallback", "reduced"] as const) {
  test(`page navigation keeps the header visible and focuses content: ${mode}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    if (mode === "fallback")
      await page.addInitScript(() => {
        Object.defineProperty(document, "startViewTransition", {
          value: undefined,
          configurable: true,
        });
      });
    await page.emulateMedia({
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    });
    await page.goto("/");
    const navigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    for (const [label, path] of [
      ["Approach", "/approach"],
      ["Systems", "/systems"],
      ["Profile", "/profile"],
      ["Contact", "/contact"],
      ["Work", "/"],
    ]) {
      await navigation.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(
        new RegExp(path === "/" ? "/$" : path + "$"),
      );
      await expect(page.locator("main")).toBeFocused();
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
      await expect(page.locator("header")).toBeInViewport({ ratio: 1 });
      if (mode === "reduced")
        expect(await page.evaluate(() => document.getAnimations().length)).toBe(
          0,
        );
    }
    await page.goBack();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL(/\/$/);
    expect(errors).toEqual([]);
  });
}

test("home copy, governance hierarchy, compact signature and SLZ identity", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".proof-line")).toHaveText(PROOF_LINE);
  const intro = page.locator(".work-foot p");
  await expect(intro).toHaveText(WORK_INTRO.body);
  const lines = await intro.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return new Set(
      [...range.getClientRects()].map((rect) => Math.round(rect.top)),
    ).size;
  });
  expect(lines).toBe(1);
  const sizes = await page
    .locator(".map-hub,.map-node button")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        size: getComputedStyle(element).fontSize,
        weight: getComputedStyle(element).fontWeight,
      })),
    );
  expect(new Set(sizes.map((value) => value.size)).size).toBe(1);
  expect(new Set(sizes.map((value) => value.weight)).size).toBe(1);
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText(SITE_NAME);
  await expect(footer).toContainText(ANTHEM.line);
  await expect(footer.getByRole("img", { name: "Sol de Mayo" })).toBeVisible();
  await expect(footer).not.toContainText("Buenos Aires");
  const icon = page.locator('link[rel="icon"]').first();
  const response = await request.get((await icon.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("SLZ — Santiago López Zavaletta");
  expect(await response.text()).not.toContain("Sun of May");
});
