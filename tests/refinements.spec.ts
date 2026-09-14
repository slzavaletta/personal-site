import { expect, test } from "@playwright/test";
import {
  ANTHEM,
  CASE_STUDIES,
  PROOF_LINE,
  WORK_INTRO,
} from "../app/lib/content";
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
      await expect(page.locator("main")).toHaveCSS("outline-style", "none");
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
  const brandSignature = footer.locator(".footer-brand__signature");
  await brandSignature.scrollIntoViewIfNeeded();
  await expect(brandSignature).toBeVisible();
  await expect(brandSignature).toHaveAttribute("alt", "");
  await expect
    .poll(() =>
      brandSignature.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await expect(brandSignature).toHaveCSS(
      "mix-blend-mode",
      theme === "dark" ? "screen" : "multiply",
    );
    await expect(brandSignature).toHaveCSS(
      "filter",
      theme === "dark" ? "invert(1)" : "none",
    );
  }
  const icon = page.locator('link[rel="icon"]').first();
  const response = await request.get((await icon.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/png");
  const png = await response.body();
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(64);
  expect(png.readUInt32BE(20)).toBe(64);
  expect(png.length).toBeLessThan(20_000);
});

for (const theme of ["light", "dark"] as const) {
  test(`compact footer and return to top remain accessible in ${theme}`, async ({
    page,
    isMobile,
  }, testInfo) => {
    await page.emulateMedia({
      colorScheme: theme,
      reducedMotion: theme === "dark" ? "reduce" : "no-preference",
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const footer = page.getByRole("contentinfo");
    const backToTop = footer.getByRole("link", { name: "Back to top" });
    for (const width of isMobile ? [320, 393] : [1440]) {
      await page.setViewportSize({ width, height: 850 });
      await footer.scrollIntoViewIfNeeded();
      if (isMobile) {
        const brand = (await footer.locator(".footer-brand").boundingBox())!;
        const signature = (await footer.locator(".signature").boundingBox())!;
        expect(brand.x + brand.width).toBeLessThan(signature.x);
        expect(brand.y + brand.height / 2).toBeCloseTo(
          signature.y + signature.height / 2,
          0,
        );
        await expect(footer.locator(".footer-top__label")).toBeHidden();
      }
      await expect(footer).toContainText(ANTHEM.line);
      await expect(footer).toContainText(SITE_NAME);
      const target = (await backToTop.boundingBox())!;
      expect(target.width).toBeGreaterThanOrEqual(44);
      expect(target.height).toBeGreaterThanOrEqual(44);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const footerBox = (await footer.boundingBox())!;
      const captureTop = Math.max(0, footerBox.y - 32);
      await page.screenshot({
        path: testInfo.outputPath(`footer-${width}.png`),
        animations: "disabled",
        clip: {
          x: footerBox.x,
          y: captureTop,
          width: footerBox.width,
          height: footerBox.y + footerBox.height - captureTop,
        },
      });
    }
    await backToTop.focus();
    await expect(backToTop).toHaveCSS("outline-style", "solid");
    await backToTop.press("Enter");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator("main")).toBeFocused();
    await expect(page.locator("main")).toHaveCSS("outline-style", "none");
    await expect(page).toHaveURL(/#main$/);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /^The work/ })).toBeFocused();
  });

  test(`pinned header remains usable and clears anchors in ${theme}`, async ({
    page,
    isMobile,
  }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    const header = page.locator("header");
    const height = await header.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    expect(height).toBeLessThanOrEqual(isMobile ? 112 : 68);
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveAttribute("data-scrolled", "true");
    expect(await header.evaluate((el) => el.getBoundingClientRect().top)).toBe(
      0,
    );
    expect(
      await header.evaluate((el) => el.getBoundingClientRect().height),
    ).toBe(height);
    await expect(header).toBeInViewport({ ratio: 1 });
    await header.getByRole("link", { name: "Systems", exact: true }).click();
    await expect(page).toHaveURL(/\/systems$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(header).toHaveAttribute("data-scrolled", "false");
    await header.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    // A wrapped, enlarged navigation must reserve its actual height for hashes.
    await page.setViewportSize({ width: 320, height: 850 });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "32px";
    });
    await expect
      .poll(() =>
        header.evaluate((el) => {
          const reserved = parseFloat(
            getComputedStyle(document.documentElement).scrollPaddingTop,
          );
          return reserved >= el.getBoundingClientRect().height;
        }),
      )
      .toBe(true);
    await page.getByRole("link", { name: /^The work/ }).click();
    await expect(page).toHaveURL(/\/#work$/);
    const positions = await page.evaluate(() => ({
      headerBottom: document.querySelector("header")!.getBoundingClientRect()
        .bottom,
      workTop: document.querySelector("#work")!.getBoundingClientRect().top,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    expect(positions.workTop).toBeGreaterThanOrEqual(positions.headerBottom);
    expect(positions.overflow).toBe(false);
    await expect(
      header.getByRole("link", { name: "Contact", exact: true }),
    ).toBeInViewport({ ratio: 1 });
  });

  test(`all pages reflow with large text on a small screen in ${theme}`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.setViewportSize({ width: 320, height: 850 });
    const paths = [
      "/",
      "/approach",
      "/systems",
      "/profile",
      "/contact",
      ...CASE_STUDIES.map((item) => "/work/" + item.id),
    ];
    for (const path of paths) {
      await test.step(path, async () => {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page
            .locator("header")
            .evaluate((el) => el.getBoundingClientRect().height),
        ).toBeLessThanOrEqual(112);
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "32px";
        });
        const overflow = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          elements: [...document.querySelectorAll("main *")]
            .filter((el) => {
              const rect = el.getBoundingClientRect();
              return (
                rect.width && (rect.right > innerWidth + 1 || rect.left < -1)
              );
            })
            .slice(0, 10)
            .map((el) => `${el.tagName}.${el.className}`),
        }));
        expect(overflow.width, JSON.stringify(overflow)).toBeLessThanOrEqual(
          overflow.viewport,
        );
        const navigation = page.getByRole("navigation", {
          name: "Primary navigation",
        });
        for (const link of await navigation.getByRole("link").all()) {
          await expect(link).toBeInViewport({ ratio: 1 });
          const box = (await link.boundingBox())!;
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
        if (path === "/approach") {
          const title = (await page.locator("h1").boundingBox())!;
          const introduction = (await page
            .locator(".page-heading > p")
            .boundingBox())!;
          expect(introduction.y).toBeGreaterThan(title.y + title.height);
          expect(introduction.x).toBeCloseTo(title.x, 0);
        }
      });
    }
  });
}

test("header stays pinned without JavaScript", async ({
  browser,
  baseURL,
  isMobile,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: isMobile ? 393 : 1440, height: 850 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(page.locator("header")).toBeInViewport({ ratio: 1 });
    expect(
      await page
        .locator("header")
        .evaluate((el) => el.getBoundingClientRect().top),
    ).toBe(0);
    await page
      .locator("header")
      .getByRole("link", { name: "Contact", exact: true })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const backToTop = page.getByRole("link", { name: "Back to top" });
    await backToTop.click();
    await expect(page).toHaveURL(/\/contact#main$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator("main")).toBeFocused();
  } finally {
    await context.close();
  }
});
