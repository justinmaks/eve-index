import { expect, test } from "@playwright/test";
test("filters listings by text, category, and all selected tags", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Search tools").fill("killmail");
  await expect(page.getByRole("heading", { name: "zKillboard" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "EVETycoon" })).toBeHidden();
  await page.getByLabel("pvp", { exact: true }).check();
  await page.getByLabel("killmails", { exact: true }).check();
  await expect(page.getByText("No tools match these filters.")).toBeHidden();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("markets-trade");
  await expect(page.getByRole("heading", { name: "EVETycoon" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "zKillboard" })).toBeHidden();
});
test("shows an empty state when no listing matches", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search tools").fill("not-a-real-capsuleer-tool");
  await expect(page.getByText("No tools match these filters.")).toBeVisible();
  await expect(page.getByText("0 tools")).toBeVisible();
});
test("keeps directory controls usable on a phone viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByLabel("Search tools")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Reset filters" }),
  ).toBeVisible();
  expect(
    await page
      .locator("body")
      .evaluate((body) => body.scrollWidth <= window.innerWidth),
  ).toBe(true);
});
