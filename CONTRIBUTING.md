# Contributing to EVE Index

Contributions are welcome for new tools, listing corrections, documentation, tests, accessibility, and focused application improvements. Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Suggest a tool

Search the [current listings](src/content/sites/) and [open issues](https://github.com/justinmaks/eve-index/issues) first. Then use the [Suggest a tool form](https://github.com/justinmaks/eve-index/issues/new?template=suggest-a-tool.yml).

A listed tool must:

- Be active at its canonical URL.
- Have a clear, practical use for EVE Online players or developers.
- Use a neutral and accurate description.
- Fit one primary category and one to five approved tags.
- Be safe to recommend publicly.

EVE Index does not list real-money trading, botting, exploits, scams, phishing, malware, deceptive services, paid placements, recruitment pages, or abandoned tools. Maintainers may decline, archive, or remove a listing when its quality, safety, availability, or relevance changes.

## Edit a listing

Listings are Markdown files in [`src/content/sites`](src/content/sites/). Use a lowercase, hyphenated filename that can serve as the public URL.

```yaml
---
name: Example Tool
url: https://example.com/
summary: A neutral 20-to-180-character explanation of the tool's EVE Online use.
category: markets-trade
tags:
  - markets
  - trade
status: active
---
```

Use category and tag values from [`src/data/taxonomy.ts`](src/data/taxonomy.ts). Do not include tracking links, referral codes, rankings, testimonials, or advertising copy. Add Markdown below the frontmatter only when users need important requirements, limitations, or safety notes.

## Pull requests

Keep each pull request focused. Explain why the change is useful, disclose any relationship to a submitted tool, and include screenshots for visible interface changes.

Run these checks before submitting:

```bash
npm run format
npm run lint
npm run check
npm run test
npm run build
```

Also run `npm run test:e2e` for route, component, filtering, search, accessibility, or other browser changes.

Maintainers may adjust listing copy and taxonomy for consistency. Passing validation does not guarantee that a listing or change will be accepted.
