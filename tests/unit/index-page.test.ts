import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("the root page", () => {
  it("identifies EVE Index as a directory of EVE Online tools", async () => {
    const page = await readFile(
      new URL("../../src/pages/index.astro", import.meta.url),
      "utf8",
    ).catch(() => "");

    expect(page).toMatch(new RegExp(`<BaseLayout\\s+title="EVE Index"`));
    expect(page).toContain('aria-labelledby="eve-index-title"');
    expect(page).toMatch(
      new RegExp(
        `<h1\\s+id="eve-index-title"[\\s\\S]*Find the right tool\\. Get back to space\\.[\\s\\S]*<\\/h1>`,
      ),
    );
    expect(page).toContain("EVE Online tools");
    expect(page).toContain("<CategoryGrid />");
    expect(page).toContain("<Directory sites={sites} />");
  });

  it("uses the canonical site URL, sitemap, and Tailwind Vite plugin", async () => {
    const config = await readFile(
      new URL("../../astro.config.mjs", import.meta.url),
      "utf8",
    );

    expect(config).toContain('site: "https://index.stin.win"');
    expect(config).toContain('import sitemap from "@astrojs/sitemap"');
    expect(config).toContain("integrations: [sitemap()]");
    expect(config).toContain('import tailwindcss from "@tailwindcss/vite"');
    expect(config).toContain("plugins: [tailwindcss()]");
  });

  it("keeps Playwright discovery separate from unit tests", async () => {
    const packageJson = await readFile(
      new URL("../../package.json", import.meta.url),
      "utf8",
    );
    const playwrightConfig = await readFile(
      new URL("../../playwright.config.ts", import.meta.url),
      "utf8",
    ).catch(() => "");

    expect(packageJson).toContain(
      '"test:e2e": "playwright test --pass-with-no-tests"',
    );
    expect(playwrightConfig).toContain('testDir: "./tests/e2e"');
  });

  it("limits Vitest discovery to unit tests", async () => {
    const vitestConfig = await readFile(
      new URL("../../vitest.config.ts", import.meta.url),
      "utf8",
    ).catch(() => "");

    expect(vitestConfig).toContain('include: ["tests/unit/**/*.test.ts"]');
  });
});
