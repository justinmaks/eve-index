import { categories, type CategorySlug, type Tag } from "../data/taxonomy";

type Site = {
  name: string;
  summary: string;
  category: CategorySlug;
  tags: readonly Tag[];
};

type SiteFilters = {
  query: string;
  category?: CategorySlug;
  tags: readonly Tag[];
};

export function faviconUrl(url: string) {
  try {
    return `${new URL(url).origin}/favicon.ico`;
  } catch {
    return "/icons/external-link.svg";
  }
}

export function categoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function matchesSite(
  site: Site,
  { query, category, tags }: SiteFilters,
) {
  if (category && site.category !== category) return false;
  if (!tags.every((tag) => site.tags.includes(tag))) return false;

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [
    site.name,
    site.category,
    categoryBySlug(site.category)?.label,
    site.summary,
    ...site.tags,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}
