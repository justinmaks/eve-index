import { describe, expect, it } from "vitest";
import { hasCanonicalUrlShape } from "../../src/lib/content-url";

describe("canonical content URLs", () => {
  it("accepts a URL without query parameters", () => {
    expect(hasCanonicalUrlShape("https://example.com/tool/")).toBe(true);
  });

  it("rejects tracking and other query parameters", () => {
    expect(hasCanonicalUrlShape("https://example.com/?utm_source=index")).toBe(
      false,
    );
  });

  it("rejects malformed URLs", () => {
    expect(hasCanonicalUrlShape("not-a-url")).toBe(false);
  });
});
