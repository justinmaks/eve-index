import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("the root page", () => {
  it("identifies EVE Index as a directory of EVE Online tools", async () => {
    const page = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8").catch(
      () => "",
    );

    expect(page).toMatch(/<title>EVE Index<\/title>/);
    expect(page).toMatch(/<main aria-labelledby="eve-index-title">/);
    expect(page).toMatch(/<h1 id="eve-index-title">EVE Index<\/h1>/);
    expect(page).toContain("EVE Online tools");
  });
});
