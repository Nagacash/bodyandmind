# SEO changelog

## 2026-07-29 — Iteration 1

- **G01:** Added `public/robots.txt` with sitemap reference
- **G02:** Added `public/sitemap.xml` (9 indexable URLs)
- **G03:** Added `src/lib/seo.ts` + `PageMeta` component for per-route title, description, canonical, OG/Twitter
- **G04:** Added `SiteStructuredData` JSON-LD (WebSite, HealthClub, Person)
- **G05:** Answer-first copy on home hero + pricing hero from `ROUTE_SEO`
- **G06:** FAQ section + FAQPage schema on `/mitgliedschaften`
- **G07:** Noscript navigation in `index.html` for crawler discoverability
- **G10:** Server-side HTML meta injection (`server/html-meta.ts`) for per-route titles/canonicals/JSON-LD without JS
