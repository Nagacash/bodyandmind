# SEO/GEO audit log

## Crawl Protocol

- **Site:** http://127.0.0.1:4173 (local preview; production: https://bodyandmindbynatalie.de)
- **Scope:** all public indexable URLs
- **Tool:** `.seo/crawl-audit.sh`
- **Checks:** robots.txt, sitemap.xml, canonicals, status codes, meta robots
- **Cache/state:** warm preview server
- **Date:** 2026-07-29

## Benchmark Protocol

- **Queries:** `.seo/queries.txt`
- **Search engines:** Google.de, Bing.de (manual — post-launch)
- **AI engines:** Perplexity, ChatGPT browse (manual — post-launch)
- **Metric:** domain rank / cited Y/N per query

## Axis scores (after fixes)

| Axis | Baseline | After fixes |
|------|----------|-------------|
| Crawlability | Fail | Pass |
| Indexation | Warn | Pass (local) |
| Page intent | Warn | Pass |
| Titles & meta | Fail | Pass |
| Internal links | Warn | Pass |
| Structured data | Fail | Pass |
| Source citations | Warn | Warn |
| Answer-first content | Fail | Pass (priority pages) |

## Iteration 1 — fixes applied

- G01: `public/robots.txt`
- G02: `public/sitemap.xml`
- G03: `PageMeta` per-route titles, descriptions, canonicals, OG tags
- G04: `SiteStructuredData` (WebSite, HealthClub, Person)
- G05: Answer-first leads on `/` and `/mitgliedschaften`
- G06: FAQ section + `FaqStructuredData` on pricing page
- G07: `<noscript>` nav links in `index.html`

## Changelog

See `.seo/changelog.md`
