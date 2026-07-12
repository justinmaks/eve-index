import { expect, test } from "@playwright/test";

test("category and detail pages render editorial content", async ({ page }) => {
  await page.goto("/categories/combat-pvp/");
  await expect(
    page.getByRole("heading", { name: "Combat & PvP", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "zKillboard" })).toBeVisible();

  await page.goto("/sites/zkillboard/");
  await expect(page.getByRole("heading", { name: "zKillboard" })).toBeVisible();
  const link = page.getByRole("link", { name: /Visit zKillboard/ });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("detail page renders an optional source code link", async ({ page }) => {
  await page.goto("/sites/jeveassets/");
  await expect(page.getByRole("heading", { name: "jEveAssets" })).toBeVisible();
  const sourceLink = page.getByRole("link", { name: /Source code/ });
  await expect(sourceLink).toHaveAttribute(
    "href",
    "https://github.com/GoldenGnu/jeveassets",
  );
  await expect(sourceLink).toHaveAttribute("target", "_blank");
  await expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("detail page omits a source code link when none is declared", async ({
  page,
}) => {
  await page.goto("/sites/zkillboard/");
  await expect(page.getByRole("link", { name: /Source code/ })).toHaveCount(0);
});

test("about and search pages expose their primary workflows", async ({
  page,
}) => {
  await page.goto("/about/");
  await expect(
    page.getByRole("heading", { name: "About EVE Index" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Open the issue tracker/ }),
  ).toBeVisible();

  await page.goto("/search/");
  await expect(page.getByLabel("Search the full index")).toBeVisible();
  await page.getByLabel("Search the full index").fill("zkillboard");
  await expect(page.locator("[data-search-status]")).not.toHaveText(
    "Enter at least 2 characters.",
  );
  await expect(
    page.getByRole("link", { name: /zKillboard/ }).last(),
  ).toBeVisible();
});
