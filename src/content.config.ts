import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { categorySlugs, tags } from "./data/taxonomy";
import { hasCanonicalUrlShape } from "./lib/content-url";

const canonicalUrl = z
  .url()
  .refine(
    hasCanonicalUrlShape,
    "Canonical URLs must not contain a query string",
  );

const sites = defineCollection({
  loader: glob({
    base: "./src/content/sites",
    pattern: "**/*.md",
  }),
  schema: z.object({
    name: z.string().min(2).max(60),
    url: canonicalUrl,
    summary: z.string().min(20).max(180),
    category: z.enum(categorySlugs),
    tags: z.array(z.enum(tags)).min(1).max(5),
    status: z.enum(["active", "archived"]),
    repository: canonicalUrl.optional(),
  }),
});

export const collections = { sites };
