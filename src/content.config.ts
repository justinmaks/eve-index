import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { categorySlugs, tags } from "./data/taxonomy";

const sites = defineCollection({
  loader: glob({
    base: "./src/content/sites",
    pattern: "**/*.md",
  }),
  schema: z.object({
    name: z.string().min(2).max(60),
    url: z.string().url(),
    summary: z.string().min(20).max(180),
    category: z.enum(categorySlugs),
    tags: z.array(z.enum(tags)).min(1).max(5),
    status: z.enum(["active", "archived"]),
    repository: z.string().url().optional(),
  }),
});

export const collections = { sites };
