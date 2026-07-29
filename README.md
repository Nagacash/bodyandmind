# body & mind by Natalie Zimmermann

Premium Personal Training, Recovery & Stressregulation — Hamburg Rothenbaumchaussee.

Built by **Naga Codex**.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- React Router v7
- Motion (animations)

## Run Locally

**Prerequisites:** Node.js 18+ or Bun

1. Install dependencies:

```bash
bun install
# or: npm install
```

2. Start the dev server:

```bash
bun run dev
# or: npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
bun run build
bun run preview
```

## Project Structure

```
src/
├── components/     # Header, Footer, UI primitives, modals
├── pages/          # Home, FLOW, FORM, Recovery, Pricing, About, Contact, Legal
├── data/           # Content, pricing, navigation
└── index.css       # Design tokens, fonts, utilities

public/
├── fonts/          # Self-hosted Playfair Display & Montserrat (GDPR)
└── images/         # Studio & brand photography
```

## License

Private client project. All rights reserved.
