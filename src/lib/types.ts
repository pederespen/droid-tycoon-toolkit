export type Variant = 'Basic' | 'Gold' | 'Diamond' | 'Rainbow' | 'Beskar'
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'
export type ToolTab = 'next' | 'lookup' | 'overview'

export type DroidType = 'Worker' | 'Astromech' | 'Battle'
export type DroidCategory = Rarity | 'Iconic'

export type Droid = {
  name: string
  type: DroidType
  category: DroidCategory
}

export type CosmeticKind = 'Hat' | 'Paint' | 'Effect'

export type Cosmetic = {
  kind: CosmeticKind
  name: string
  requirement: string
}

// Economy stats for a single droid variant. Amounts are kept as the
// abbreviated strings used in-game (e.g. '3.8k', '112.50m'); use
// `parseAmount` from economyData to convert to numbers. `income` is the
// per-second credit generation. Values are null when not applicable
// (e.g. iconic droids have no cost or sell value).
export type VariantEconomy = {
  cost: string | null
  income: string | null
  value: string | null
}

export type DroidEconomy = {
  name: string
  base: VariantEconomy
  gold: VariantEconomy
  diamond: VariantEconomy
  rainbow: VariantEconomy
  beskar: VariantEconomy
}

export type Requirement = {
  variant: Variant
  name: string
  rarity: Rarity
}

export type RebirthStep = {
  from: number
  to: number
  cost: string
  unlock: string
  patterns: [Requirement[], Requirement[], Requirement[], Requirement[]]
}

export type RequirementMatch = {
  step: RebirthStep
  requirements: Requirement[]
}

// A match for the Super Rebirth cycle finder: a rebirth step whose requirement
// droids (for one of its four paths) match the droids the player entered.
// `cycle` is the 1-based Super Rebirth path (1–4) that matched.
export type RebirthCycleMatch = {
  cycle: number
  step: RebirthStep
  requirements: Requirement[]
}

// The consolidated, highest-variant requirement for a single droid across a
// range of rebirth levels on one Super Rebirth cycle. Because a higher variant
// covers all lower ones (e.g. a Rainbow droid satisfies its Basic/Gold/Diamond
// requirements too), only the highest variant needed is kept. `levels` lists
// the rebirth steps (by `from` level) where this droid is required.
export type CycleDroidRequirement = {
  name: string
  variant: Variant
  rarity: Rarity
  levels: number[]
}

export type NovaShopCategory = 'Core' | 'Workshop' | 'Cosmetics'

// A single Nova Shop upgrade track. `costs[i]` is the Nova Crystal cost of the
// upgrade's level i+1; the array length is the number of *known* levels.
// `endless` is true when the upgrade can keep being upgraded beyond the known
// levels (shown yellow in the sheet — further costs just aren't discovered
// yet); false when the upgrade is capped at its last known level (shown grey).
export type NovaUpgrade = {
  category: NovaShopCategory
  name: string
  costs: number[]
  endless: boolean
}

// Super Rebirth reward for reaching a given rebirth level. Multipliers are
// stored as percentages (e.g. 22 means +22% credits).
export type NovaRebirthReward = {
  level: number
  crystals: number
  creditMult: number
  xpMult: number
}
