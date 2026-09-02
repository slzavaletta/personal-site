import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3101);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/*
 * Runs against a production server: the accessibility checks have to see the
 * same HTML and CSS a reader gets, not the development bundle.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
