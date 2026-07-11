# EVE Index

EVE Index is an editorial directory of useful third-party tools for [EVE Online](https://www.eveonline.com/). It helps players find active services for combat, exploration, industry, markets, wormholes, intel, and other common activities.

The site is built with Astro and published as static HTML at [index.stin.win](https://index.stin.win/). Listings are reviewed through GitHub. There are no accounts, votes, or paid placements.

> EVE Index is under active development. The launch catalog is still being curated.

## Development

Use a current Node.js LTS release and npm.

```bash
npm ci
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

The deployable output is written to `dist/`. The production target is Cloudflare Pages using `npm run build` and the `dist` output directory.

## Validation

Before opening a pull request, run:

```bash
npm run format
npm run lint
npm run check
npm run test
npm run build
```

Run `npm run test:e2e` for changes that affect pages or browser behavior. If Chromium is not installed for Playwright, run `npx playwright install chromium` first.

## Content

Tool records live in [`src/content/sites`](src/content/sites/). Categories and tags are defined in [`src/data/taxonomy.ts`](src/data/taxonomy.ts), and all records are validated by [`src/content.config.ts`](src/content.config.ts).

Favicons are cached in [`public/favicons`](public/favicons/) so builds do not depend on third-party sites. Pagefind creates the search index after Astro builds the site.

## Contributing

Use the [Suggest a tool form](https://github.com/justinmaks/eve-index/issues/new?template=suggest-a-tool.yml) for new listings. Well-researched corrections and pull requests are also welcome.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing. Listings are reviewed for EVE relevance, availability, practical value, safety, and neutral wording. A valid submission is not guaranteed inclusion.

## License

The project is available under the [MIT License](LICENSE). Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

EVE Online and all related logos and marks are trademarks of CCP Games. EVE Index is an independent fan project and is not affiliated with or endorsed by CCP Games. Third-party names and icons remain the property of their respective owners.
