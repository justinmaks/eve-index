import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("site favicon", () => {
  it("declares ICO, SVG, and touch icon assets in the shared layout", async () => {
    const layout = await readFile(
      new URL("../../src/layouts/BaseLayout.astro", import.meta.url),
      "utf8",
    );

    expect(layout).toContain('href="/favicon.ico"');
    expect(layout).toContain('href="/favicon.svg"');
    expect(layout).toContain('href="/apple-touch-icon.png"');
    expect(layout).toContain('name="theme-color" content="#10181f"');
  });

  it("ships valid source and generated favicon formats", async () => {
    const [svg, ico, touchIcon] = await Promise.all([
      readFile(new URL("../../public/favicon.svg", import.meta.url), "utf8"),
      readFile(new URL("../../public/favicon.ico", import.meta.url)),
      readFile(new URL("../../public/apple-touch-icon.png", import.meta.url)),
    ]);

    expect(svg).toContain('viewBox="0 0 64 64"');
    expect(ico.subarray(0, 4)).toEqual(Buffer.from([0, 0, 1, 0]));
    expect(touchIcon.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
  });
});
