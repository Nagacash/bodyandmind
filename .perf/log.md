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

## Run 4 — image flash + mobile weight — 2026-07-29

**Problem:** On deployed mobile, gallery images showed a placeholder box for a flash before load. Root cause: raw JPGs were **3–15 MB** each (e.g. `10.jpg` = 15 MB).

**Changes:**

1. Converted used gallery images to WebP @ max 1600px (e.g. 15 MB → ~110 KB)
2. Removed shimmer/icon placeholder flash — quiet `#151515` skeleton only
3. Soft opacity fade-in; handle cached `img.complete`
4. `loading="lazy"` below-fold; `priority`/`fetchPriority=high` on PageHero
5. Moved original JPGs out of `public/` so deploys stay light

| Page | Median (ms) | Pass (<50)? |
|------|-------------|-------------|
| / | 1.13 | yes |
| /flow | 0.65 | yes |
| /form | 0.58 | yes |
| /recovery | 0.55 | yes |
| /mitgliedschaften | 0.52 | yes |
| /pricing | 0.52 | yes |
| /ueber-uns | 0.54 | yes |
| /about | 0.55 | yes |
| /kontakt | 0.53 | yes |
| /contact | 0.57 | yes |
| /impressum | 0.51 | yes |
| /datenschutz | 0.52 | yes |

**Image transfer (localhost):** `10.webp` ~112 KB / 31 ms · `6.webp` ~53 KB / 17 ms

**Result:** 12/12 passed — HTML still &lt; 50 ms; mobile image weight fixed

**CSV:** `.perf/results-image-opt.csv`

## Final — 2026-07-29 (image opt)

**All pages < 50 ms:** yes  
**Redeploy required** for production to pick up WebPs + flash fix.
