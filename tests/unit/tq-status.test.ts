import { describe, expect, it } from "vitest";
import { formatTqPlayerCount } from "../../src/lib/tq-status";

describe("formatTqPlayerCount", () => {
  it("formats the active capsuleer count with separators", () => {
    expect(formatTqPlayerCount(1234567)).toBe("1,234,567");
  });
});
