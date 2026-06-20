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

// Total collectible slots across the whole roster.
export const totalSlots = droids.reduce(
  (sum, droid) => sum + slotsFor(droid).length,
  0,
)

function load(): Record<string, CollectionSlot[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
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
  }
}

export const droidex = createDroidex()
