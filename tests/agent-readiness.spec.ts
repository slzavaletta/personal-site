import { expect, test } from "@playwright/test";
import {
  BRIEF,
  CASE_STUDIES,
  EXPERIENCE,
  HERO,
  NOW,
  SYSTEMS,
  TOOL_GROUPS,
  CONTACT,
} from "../app/lib/content";

const variants = [
  ["*/*", "text/html"],
  ["text/markdown", "text/markdown"],
  ["text/html", "text/html"],
  ["text/html;q=1, text/markdown;q=0.5", "text/html"],
  ["text/markdown;q=0, text/html;q=1", "text/html"],
  ["text/markdown;q=1, text/html;q=0.5", "text/markdown"],
  ["text/html;q=1, text/markdown;q=1", "text/html"],
  ["text/markdown;q=1, */*;q=0.5", "text/markdown"],
];

test("root respects media quality and keeps cache variants separate", async ({
  request,
}) => {
  for (const [accept, type] of [
    ...variants,
    ...variants.slice(0, 3).reverse(),
  ]) {
    const response = await request.get("/", { headers: { Accept: accept } });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(type);
    // Next 15 replaces HTML Vary with its Flight headers. Both root variants
    // must be no-store; Markdown additionally declares its negotiation key.
    expect(response.headers()["cache-control"]).toContain("no-store");
    const body = await response.text();
    if (type === "text/markdown") {
      expect(response.headers().vary.toLowerCase().split(/,\s*/)).toContain(
        "accept",
      );
      expect(body).toMatch(/^# Santiago/);
      expect(body).not.toContain("<html");
      expect(response.headers()["cache-control"]).toContain("no-store");
    } else {
      expect(body).toContain("<html");
    }
  }
});

test("discovery points to complete real resources and HEAD preserves the format", async ({
  request,
}) => {
  const root = await request.get("/");
  expect(root.headers().link).toContain('rel="describedby"');
  expect(root.headers().link).toContain("/index.md");
  const markdown = await request.get("/index.md");
  expect(markdown.headers()["content-type"]).toContain("text/markdown");
  const body = await markdown.text();
  for (const text of [
    HERO.role,
    HERO.statement,
    HERO.supporting,
    HERO.direction,
    ...BRIEF.fields.flatMap((item) => [
      item.prompt,
      item.whenMissing,
      item.fromTheWork,
    ]),
    ...CASE_STUDIES.flatMap((item) => [
      item.title,
      item.summary,
      item.context,
      item.constraint,
    ]),
    ...EXPERIENCE.map((item) => item.body),
    ...SYSTEMS.projects.map((item) => item.body),
  ]) {
    expect(body).toContain(text);
  }
  for (const path of ["/", "/index.md"]) {
    const head = await request.head(path, {
      headers: { Accept: "text/markdown" },
    });
    expect(head.headers()["content-type"]).toContain("text/markdown");
    expect(await head.body()).toHaveLength(0);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
  );
  expect(await robots.text()).toContain(
    "Sitemap: https://www.slzavaletta.com/sitemap.xml",
  );
  expect(
    (await request.get("/sitemap.xml")).headers()["content-type"],
  ).toContain("xml");
  expect(await (await request.get("/llms.txt")).text()).toContain("/index.md");
  expect(
    (
      await request.get("/SantiagoLopezZavaletta_CV.pdf", {
        headers: { Accept: "text/markdown" },
      })
    ).headers()["content-type"],
  ).toContain("application/pdf");
});

test("RSC requests retain their representation", async ({ request }) => {
  const response = await request.get("/", {
    headers: { RSC: "1", Accept: "text/markdown" },
  });
  expect(response.headers()["content-type"]).toContain("text/x-component");
  expect(response.headers().vary.toLowerCase().split(/,\s*/)).toContain("rsc");
});

test("all authored content remains readable across real pages without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator(".map-edges")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "AI delivery", exact: true }),
  ).toHaveAttribute("href", "/work/ai-delivery");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.goto(baseURL! + "/approach");
  for (const field of BRIEF.fields) {
    await expect(
      page.getByText(field.whenMissing, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(field.fromTheWork, { exact: true }),
    ).toBeVisible();
  }
  for (const item of CASE_STUDIES) {
    await page.goto(baseURL! + "/work/" + item.id);
    await expect(page.getByText(item.summary, { exact: true })).toBeVisible();
    await expect(page.getByText(item.context, { exact: true })).toBeVisible();
  }
  await page.goto(baseURL! + "/profile");
  for (const text of [
    HERO.supporting,
    HERO.direction,
    NOW.building,
    NOW.learning,
    NOW.availability,
    ...EXPERIENCE.map((item) => item.body),
  ]) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  await page.goto(baseURL! + "/systems");
  for (const text of [
    SYSTEMS.infrastructure,
    ...SYSTEMS.projects.map((item) => item.body),
    ...TOOL_GROUPS.map((item) => item.note),
  ]) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  await page.goto(baseURL! + "/contact");
  await expect(page.getByText(CONTACT.body, { exact: true })).toBeVisible();
  await context.close();
});

test("reduced motion does not load Three.js and remains usable at 320px", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(page.locator(".deployment-map")).toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".map-edges")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Systems", exact: true })
    .click();
  await expect(page).toHaveURL(/\/systems$/);
  await expect(
    page.getByRole("heading", { name: SYSTEMS.heading }),
  ).toBeVisible();
});

test("WebGL failure preserves the spatial map and case controls", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".deployment-map")).toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".map-edges")).toBeVisible();
  await expect(page.locator(".map-graph")).toHaveAttribute(
    "data-ready",
    "false",
  );
  await page.getByRole("button", { name: "M&A", exact: true }).click();
  await expect(
    page.locator("#selected-mergers-and-acquisitions"),
  ).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("prefetch is not converted to Markdown", async ({ request }) => {
  for (const header of [
    "next-router-prefetch",
    "next-router-segment-prefetch",
  ]) {
    const response = await request.get("/", {
      headers: { [header]: "1", Accept: "text/markdown" },
    });
    expect(response.headers()["content-type"]).not.toContain("text/markdown");
    expect(response.headers()["cache-control"]).toContain("no-store");
  }
});

test("desktop Three.js scene renders, responds and releases offscreen resources", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Touch devices deliberately use the static fallback");
  await page.setViewportSize({ width: 1440, height: 1200 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window);
    // Model a frame timestamp older than setup's performance.now(). The map
    // must still move, finish, recolor and release resources without errors.
    window.requestAnimationFrame = (callback) =>
      request((timestamp) => callback(Math.max(0, timestamp - 100)));
  });
  await page.goto("/");
  const map = page.locator(".map-graph");
  await map.scrollIntoViewIfNeeded();
  await expect(map).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(map.locator("canvas")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Digital Twin Studio", exact: true })
    .click();
  await expect(page.locator(".map-canvas")).toHaveAttribute(
    "data-motion",
    "running",
  );
  await expect(page.locator(".map-canvas")).toHaveAttribute(
    "data-motion",
    "settled",
  );
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.locator(".map-canvas").getAttribute("data-motion")).toBe(
    "settled",
  );
  await expect(map.locator("canvas")).toHaveCount(1);
  await page.screenshot({
    path: test.info().outputPath("desktop-three.png"),
    animations: "disabled",
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(map).toHaveAttribute("data-ready", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(map).toHaveAttribute("data-ready", "true");
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Approach", exact: true })
    .click();
  await expect(page).toHaveURL(/\/approach$/);
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("every public page has a unique canonical and appears in discovery", async ({
  request,
}) => {
  const paths = [
    "/",
    "/approach",
    "/systems",
    "/profile",
    "/contact",
    ...CASE_STUDIES.map((item) => "/work/" + item.id),
  ];
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const llms = await (await request.get("/llms.txt")).text();
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const canonical =
      "https://www.slzavaletta.com" + (path === "/" ? "" : path);
    expect(html).toContain(`rel="canonical" href="${canonical}"`);
    expect(html).toContain('type="application/ld+json"');
    expect(sitemap).toContain(`<loc>${canonical}</loc>`);
    if (path !== "/") expect(llms).toContain(canonical);
  }
  expect((await request.get("/work/missing-case")).status()).toBe(404);
});
