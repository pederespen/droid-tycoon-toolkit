import type { DroidCategory, DroidType, Variant } from './types'

// Centralized color "tones" so badges and labels stay consistent everywhere.
export type Tone =
  | 'slate'
  | 'ghost'
  | 'zinc'
  | 'blue'
  | 'purple'
  | 'amber'
  | 'cyan'
  | 'emerald'
  | 'violet'
  | 'rose'
  | 'fuchsia'
  | 'orange'

export const rarityTone: Record<DroidCategory, Tone> = {
  Common: 'slate',
  Rare: 'blue',
  Epic: 'purple',
  Legendary: 'amber',
  Iconic: 'cyan',
}

export const typeTone: Record<DroidType, Tone> = {
  Worker: 'emerald',
  Astromech: 'violet',
  Battle: 'rose',
}

export const variantTone: Record<Variant, Tone> = {
  Basic: 'ghost',
  Gold: 'amber',
  Diamond: 'cyan',
  Rainbow: 'fuchsia',
  Beskar: 'zinc',
}

// Formats a per-second income string for display (e.g. '4.08k' -> '4.08k/s').
export const formatIncome = (income: string | null) =>
  income == null ? '—' : `${income}/s`

export const formatAmount = (amount: string | null) => amount ?? '—'
