import { describe, expect, it } from "vitest";
import { categoryBySlug, faviconUrl, matchesSite } from "../../src/lib/sites";

const zkillboard = {
  name: "zKillboard",
  url: "https://zkillboard.com/",
  summary: "A public killmail and combat statistics service for EVE Online.",
  category: "combat-pvp",
  tags: ["killmails", "pvp"],
  status: "active",
} as const;

describe("site directory helpers", () => {
  it("returns a known category", () => {
    expect(categoryBySlug("abyssal")).toMatchObject({
      slug: "abyssal",
      label: "Abyssal",
    });
  });

  it("derives a favicon URL from the site URL", () => {
    expect(faviconUrl("https://zkillboard.com/")).toBe(
      "https://zkillboard.com/favicon.ico",
    );
  });

  it("falls back when the URL is invalid", () => {
    expect(faviconUrl("not-a-url")).toBe("/icons/external-link.svg");
  });

  it("matches text case-insensitively", () => {
    expect(matchesSite(zkillboard, { query: "COMBAT", tags: [] })).toBe(true);
  });

  it("matches a selected tag", () => {
    expect(matchesSite(zkillboard, { query: "", tags: ["killmails"] })).toBe(
      true,
    );
  });

  it("rejects a different category", () => {
    expect(
      matchesSite(zkillboard, { query: "", category: "abyssal", tags: [] }),
    ).toBe(false);
  });

  it("rejects two selected tags when one is absent", () => {
    expect(
      matchesSite(zkillboard, { query: "", tags: ["killmails", "abyssal"] }),
    ).toBe(false);
  });
});
