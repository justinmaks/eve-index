export const categorySlugs = [
  "combat-pvp",
  "exploration",
  "abyssal",
  "industry-mining",
  "planetary-interaction",
  "markets-trade",
  "wormholes",
  "intel-safety",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export const categories = [
  {
    slug: "combat-pvp",
    label: "Combat & PvP",
    description: "Tools for combat activity, kill reports, and PvP analysis.",
  },
  {
    slug: "exploration",
    label: "Exploration",
    description:
      "Tools for scanning, relic sites, data sites, and exploration routes.",
  },
  {
    slug: "abyssal",
    label: "Abyssal",
    description: "Tools for Abyssal Deadspace runs, fittings, and tracking.",
  },
  {
    slug: "industry-mining",
    label: "Industry & Mining",
    description:
      "Tools for production, resource extraction, and industrial planning.",
  },
  {
    slug: "planetary-interaction",
    label: "Planetary Interaction",
    description: "Tools for planetary production chains and colony planning.",
  },
  {
    slug: "markets-trade",
    label: "Markets & Trade",
    description: "Tools for market data, pricing, hauling, and trade analysis.",
  },
  {
    slug: "wormholes",
    label: "Wormholes",
    description: "Tools for wormhole mapping, connections, and operations.",
  },
  {
    slug: "intel-safety",
    label: "Intel & Safety",
    description:
      "Tools for intel gathering, route awareness, and pilot safety.",
  },
] as const satisfies readonly {
  slug: CategorySlug;
  label: string;
  description: string;
}[];

export const tags = [
  "abyssal",
  "combat",
  "exploration",
  "filaments",
  "fitting",
  "gatecamps",
  "industry",
  "intel",
  "killmails",
  "markets",
  "mining",
  "pi",
  "pvp",
  "reference",
  "scanning",
  "trade",
  "wormholes",
] as const;

export type Tag = (typeof tags)[number];
