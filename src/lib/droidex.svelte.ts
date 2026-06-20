import { droids } from './droidsData'
import type { CollectionSlot, Droid } from './types'

const STORAGE_KEY = 'droidex-collection-v1'

// Every collectible slot for a standard droid, in display order. Iconic droids
// are event-locked to their base form only.
export const allSlots: CollectionSlot[] = [
  'Basic',
  'Gold',
  'Diamond',
  'Rainbow',
  'Beskar',
  'Flawless',
]

export const slotsFor = (droid: Droid): CollectionSlot[] =>
  droid.category === 'Iconic' ? ['Basic'] : allSlots

// Valid slots per droid name, used to sanitize imported data so a tampered or
// outdated file can't inject unknown droids or invalid variants.
const validSlots = new Map<string, Set<CollectionSlot>>(
  droids.map((droid) => [droid.name, new Set(slotsFor(droid))]),
)

// Keep only known droids and valid, de-duplicated slots for each.
function sanitize(input: unknown): Record<string, CollectionSlot[]> {
  if (!input || typeof input !== 'object') return {}
  const out: Record<string, CollectionSlot[]> = {}
  for (const [name, slots] of Object.entries(
    input as Record<string, unknown>,
  )) {
    const allowed = validSlots.get(name)
    if (!allowed || !Array.isArray(slots)) continue
    const kept = [...new Set(slots)].filter(
      (s): s is CollectionSlot =>
        typeof s === 'string' && allowed.has(s as CollectionSlot),
    )
    if (kept.length) out[name] = kept
  }
  return out
}

// Total collectible slots across the whole roster.
export const totalSlots = droids.reduce(
  (sum, droid) => sum + slotsFor(droid).length,
  0,
)

function load(): Record<string, CollectionSlot[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return sanitize(JSON.parse(raw))
  } catch {
    return {}
  }
}

function createDroidex() {
  let collection = $state<Record<string, CollectionSlot[]>>(load())

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
    } catch {
      // Storage may be unavailable (private mode / quota); tracking just
      // won't persist in that case.
    }
  }

  return {
    get collection() {
      return collection
    },
    has(name: string, slot: CollectionSlot): boolean {
      return collection[name]?.includes(slot) ?? false
    },
    count(name: string): number {
      return collection[name]?.length ?? 0
    },
    toggle(name: string, slot: CollectionSlot) {
      const current = collection[name] ?? []
      const next = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot]
      collection = { ...collection, [name]: next }
      persist()
    },
    clear() {
      collection = {}
      persist()
    },
    // Serialize the current collection for download as a JSON backup.
    exportData() {
      return {
        app: 'droid-tycoon-toolkit',
        type: 'droidex-collection',
        version: 1,
        exportedAt: new Date().toISOString(),
        collection,
      }
    },
    // Replace the collection from a parsed JSON backup. Accepts either the
    // wrapped export shape or a bare collection object. Returns the number of
    // droids imported, or throws if nothing valid was found.
    importData(data: unknown): number {
      const raw =
        data && typeof data === 'object' && 'collection' in data
          ? (data as { collection: unknown }).collection
          : data
      const sanitized = sanitize(raw)
      if (Object.keys(sanitized).length === 0) {
        throw new Error('No valid droid data found in this file.')
      }
      collection = sanitized
      persist()
      return Object.keys(sanitized).length
    },
  }
}

export const droidex = createDroidex()
