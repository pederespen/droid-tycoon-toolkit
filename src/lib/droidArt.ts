import { droidImages } from './droidImages'
import type { CollectionSlot } from './types'

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
