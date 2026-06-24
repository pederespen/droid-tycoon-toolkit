# Droid Tycoon Toolkit

A fast, compact reference and planning toolkit for the Fortnite **Droid Tycoon** game mode — economy tables, rebirth planning, droid lookup, and a Pokédex-style **Droidex** collection tracker.

Built with Svelte 5, TypeScript, Tailwind CSS v4, and Vite. Deployed to GitHub Pages.

> **Live site:** https://pederespen.github.io/droid-tycoon-toolkit/

## Data source & credits

All game data comes from the community-maintained
[Droid Tycoon spreadsheet](https://docs.google.com/spreadsheets/d/1otLCKSCMKICMlnefirQ8KZhh_rdZTd5Mp8h0UYFUiqg/edit)
(by reddit u/kitkat082700) — full credit to its authors.

Droid portrait art is sourced from the community
[Fortnite Fandom wiki](https://fortnite.fandom.com/wiki/Droid_Tycoon).
These images are © Epic Games / Lucasfilm and are used here for a
non-commercial fan reference tool.

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

### Known missing art

The Droidex falls back to the next-best available portrait when a variant is
missing.

- **Iconic droids** (BB8, Mister Bones, IG-11 Marshal, DJ-R3X, CB-23) — base art
  only; this is expected, since iconics don't have variant tiers.
- **CB-23** — not released in-game yet, so its base portrait is a placeholder
  silhouette.
