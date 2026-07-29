# Performance log — sub-50ms page load

## Test Protocol

- **Build:** production (`bun run build`)
- **Server:** `NODE_ENV=production PORT=4173 bunx tsx server/index.ts` (Express + static + SSR meta)
- **Base URL:** http://127.0.0.1:4173
- **Cache state:** warm (same preview process across runs)
- **Tool:** `./.perf/measure-pages.sh`
- **Runs per page:** 5; median recorded
- **Network:** localhost (no throttling)
- **Primary metric:** curl `time_total` (HTML document)
- **Date:** 2026-07-29

## Page inventory (`.perf/pages.txt`)

12 user-facing routes: `/`, `/flow`, `/form`, `/recovery`, `/mitgliedschaften`, `/pricing`, `/ueber-uns`, `/about`, `/kontakt`, `/contact`, `/impressum`, `/datenschutz`

## Baseline — 2026-07-29

**Change:** none (monolithic 460 kB JS bundle, 714 kB JPG in main chunk)

| Page | Median (ms) | Pass (<50)? |
|------|-------------|-------------|
| / | 1.21 | yes |
| /flow | 1.19 | yes |
| /form | 0.95 | yes |
| /recovery | 0.95 | yes |
| /mitgliedschaften | 0.79 | yes |
| /pricing | 0.89 | yes |
| /ueber-uns | 0.88 | yes |
| /about | 0.96 | yes |
| /kontakt | 1.03 | yes |
| /contact | 1.01 | yes |
| /impressum | 0.86 | yes |
| /datenschutz | 0.93 | yes |

**Result:** 12/12 passed

## Run 2 — optimized — 2026-07-29

**Changes:**

1. Lazy-loaded all page routes (`React.lazy` + `Suspense`)
2. Vite `manualChunks`: `vendor` (react), `motion` (motion/react)
3. Removed 714 kB recovery JPG from JS bundle → `/images/recovery3.webp`
4. Font preload hints in `index.html`
5. Production static cache headers (`immutable` for hashed assets)
6. Removed unused deps: `@fontsource/*`, `@google/genai`

**Bundle impact:** main JS 460 kB → 224 kB (gzip 140 → 69 kB)

| Page | Median (ms) | Pass (<50)? |
|------|-------------|-------------|
| / | 1.03 | yes |
| /flow | 0.95 | yes |
| /form | 0.95 | yes |
| /recovery | 0.87 | yes |
| /mitgliedschaften | 0.78 | yes |
| /pricing | 0.95 | yes |
| /ueber-uns | 1.04 | yes |
| /about | 1.10 | yes |
| /kontakt | 1.00 | yes |
| /contact | 1.00 | yes |
| /impressum | 0.95 | yes |
| /datenschutz | 1.01 | yes |

**Result:** 12/12 passed — no regressions

## Final — 2026-07-29

**All pages < 50 ms:** yes (medians ~0.8–1.2 ms on localhost)

**Note:** curl measures HTML shell delivery (SPA). Real-world interactivity also benefits from route code-splitting and smaller initial JS (224 kB vs 460 kB).

## Run 3 — post-security — 2026-07-29

**Changes since Run 2:**

1. Express app refactor (`server/app.ts` + `createApp`)
2. Rate limiting + CORS hardening on `/api/inquiry`
3. Shared inquiry validation (`shared/inquiry.ts`) + field length limits
4. Server-side meta injection unchanged (still per-route via `injectRouteHtmlMeta`)

**Server:** production Express (not Vite preview) — matches `bun run start` deployment.

| Page | Median (ms) | Pass (<50)? |
|------|-------------|-------------|
| / | 1.11 | yes |
| /flow | 0.99 | yes |
| /form | 0.78 | yes |
| /recovery | 0.59 | yes |
| /mitgliedschaften | 0.72 | yes |
| /pricing | 0.65 | yes |
| /ueber-uns | 0.62 | yes |
| /about | 0.72 | yes |
| /kontakt | 0.70 | yes |
| /contact | 0.74 | yes |
| /impressum | 0.73 | yes |
| /datenschutz | 0.65 | yes |

**Result:** 12/12 passed — no regressions vs Run 2

## Final — 2026-07-29 (reconfirmed)

**All pages < 50 ms:** yes (medians ~0.6–1.1 ms on localhost, production Express server)

**CSV:** `.perf/results-post-security.csv`
