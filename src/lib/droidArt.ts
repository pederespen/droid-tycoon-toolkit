import { droidImages } from './droidImages'
import { normalizeDroidName } from './droidUtils'
import type { CollectionSlot, Variant } from './types'

const BASE = import.meta.env.BASE_URL

// Visual tiers that have portrait art, highest to lowest. The Droidex shows the
// best variant a player has collected, so the portrait "upgrades" over time.
const artTiers: CollectionSlot[] = [
  'Beskar',
  'Rainbow',
  'Diamond',
  'Gold',
  'Basic',
]

const url = (file: string) => `${BASE}droids/${file}`

// Portrait to display for a droid: the highest collected variant that has art,
// falling back to the base portrait. Returns undefined if no art exists.
export function droidArt(
  name: string,
  collected: CollectionSlot[],
): string | undefined {
  const art = droidImages[name]
  if (!art) return undefined
  for (const tier of artTiers) {
    if (art[tier] && collected.includes(tier)) return url(art[tier])
  }
  return art.Basic ? url(art.Basic) : undefined
}

// Image map keyed by normalized name so requirement names (which can differ in
// spacing/punctuation from the roster) still resolve to the right portraits.
const imagesByNormalized = new Map(
  Object.entries(droidImages).map(([name, art]) => [
    normalizeDroidName(name),
    art,
  ]),
)

// Variant tiers from highest to lowest, used to fall back when a droid's image
// set doesn't include the requested variant (e.g. Beskar art may be missing).
const variantFallback: CollectionSlot[] = [
  'Beskar',
  'Rainbow',
  'Diamond',
  'Gold',
  'Basic',
]

// Portrait for a specific droid variant, falling back to the next-lower variant
// that has art. Returns undefined if the droid has no art at all.
export function variantArt(name: string, variant: Variant): string | undefined {
  const art = imagesByNormalized.get(normalizeDroidName(name))
  if (!art) return undefined
  const start = Math.max(variantFallback.indexOf(variant), 0)
  for (let i = start; i < variantFallback.length; i++) {
    const file = art[variantFallback[i]]
    if (file) return url(file)
  }
  return undefined
}
