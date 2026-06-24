# Droid Tycoon Toolkit

A fast, compact reference and planning toolkit for the Fortnite **Droid Tycoon** game mode — economy tables, rebirth planning, droid lookup, and a Pokédex-style **Droidex** collection tracker.

Built with Svelte 5, TypeScript, Tailwind CSS v4, and Vite. Deployed to GitHub Pages.

> **Live site:** https://pederespen.github.io/droid-tycoon-toolkit/

## Data source & credits

All game data comes from the community-maintained
[Droid Tycoon spreadsheet](https://docs.google.com/spreadsheets/d/1otLCKSCMKICMlnefirQ8KZhh_rdZTd5Mp8h0UYFUiqg/edit)
(by reddit u/kitkat082700) — full credit to its authors.

## Development

```sh
npm install
npm run dev      # start the dev server on http://localhost:3000
npm run build    # production build to dist/
npm run check    # svelte-check + type checking
```

Deployment is automatic: pushing to `main` triggers the GitHub Actions
workflow in `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to GitHub Pages.

## Droid images

Portraits are self-hosted under `public/droids/`, one folder per droid with a
file per variant (`<slug>/basic.png`, `gold.png`, `diamond.png`, `rainbow.png`,
`beskar.png`), and mapped to droids/variants in `src/lib/droidImages.ts`.

They're extracted from in-game Droidex screenshots with
`scripts/extract_droids.py`, which detects the card grid, crops each portrait,
removes the background, and writes one transparent PNG per droid/variant.

In the Droidex, each card shows the **highest variant you've collected**, falls
back to the base portrait, and renders grayscale/dimmed until you've collected
anything.
