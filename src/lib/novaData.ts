import type { NovaRebirthReward, NovaUpgrade } from './types'

// Super Rebirth (SRB) introduces 4 different rebirth requirement paths that you
// cycle through, in order 1 -> 2 -> 3 -> 4, where path 1 is the original
// rebirth requirements. The four paths correspond to the four `patterns`
// entries on each step in rebirthData.
export const superRebirthPathCount = 4

// Nova Shop upgrades. Each track's `costs[i]` is the Nova Crystal cost to buy
// level i+1 of that upgrade; the array length is its number of known levels.
// `endless` upgrades (yellow in the sheet) keep going beyond the listed costs
// — further prices just aren't discovered yet. Capped upgrades (grey) stop at
// their last listed level.
export const novaUpgrades: NovaUpgrade[] = [
  // Core upgrades
  { category: 'Core', name: 'Max Health', costs: [1], endless: true },
  { category: 'Core', name: 'Damage', costs: [1, 13], endless: true },
  {
    category: 'Core',
    name: 'Credits',
    costs: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42],
    endless: true,
  },
  { category: 'Core', name: 'Flawless Charm', costs: [500], endless: false },
  {
    category: 'Core',
    name: 'Movement Speed',
    costs: [1, 2, 4, 6, 8],
    endless: true,
  },
  {
    category: 'Core',
    name: 'Double Daily Quests',
    costs: [75],
    endless: false,
  },
  {
    category: 'Core',
    name: 'Pickaxe Mastery',
    costs: [5, 10, 15, 20, 25, 30],
    endless: false,
  },
  {
    category: 'Core',
    name: 'Jawa Bartering',
    costs: [5, 15, 30],
    endless: false,
  },
  { category: 'Core', name: 'Super Crates', costs: [10, 25], endless: false },

  // Workshop upgrades
  { category: 'Workshop', name: 'Lounge Slot', costs: [1, 30], endless: false },
  {
    category: 'Workshop',
    name: 'Upgrade Chip Scrap',
    costs: [2, 5, 10, 15, 20],
    endless: true,
  },
  {
    category: 'Workshop',
    name: 'Scrap Value',
    costs: [25, 55, 85, 115, 145, 185, 215, 235],
    endless: true,
  },
  {
    category: 'Workshop',
    name: 'Blueprint Scrap',
    costs: [1, 12, 24, 36],
    endless: false,
  },
  {
    category: 'Workshop',
    name: 'Crafting Speed',
    costs: [3, 18, 33, 48, 63],
    endless: true,
  },
  {
    category: 'Workshop',
    name: 'Blueprint Storage',
    costs: [10, 75, 150],
    endless: false,
  },
  {
    category: 'Workshop',
    name: 'Collect All',
    costs: [3, 25, 100],
    endless: false,
  },
  {
    category: 'Workshop',
    name: 'Rebirth Droid Alert',
    costs: [10],
    endless: false,
  },
  {
    category: 'Workshop',
    name: 'Blueprint Vendor',
    costs: [10],
    endless: false,
  },

  // Cosmetics (Nova Crystal base paint stages; see Nova Crystal Stage 1-3 in
  // cosmeticsData — the 3rd stage's cost is not yet discovered)
  {
    category: 'Cosmetics',
    name: 'Nova Crystal Base Paint',
    costs: [30, 120],
    endless: true,
  },
]

// Nova Crystals awarded per rebirth level (Super Rebirths begin at RB 12), and
// the credit / XP multipliers they grant. Multipliers are percentages.
export const novaRebirthRewards: NovaRebirthReward[] = [
  { level: 12, crystals: 11, creditMult: 22, xpMult: 110 },
  { level: 13, crystals: 16, creditMult: 32, xpMult: 160 },
  { level: 14, crystals: 22, creditMult: 44, xpMult: 220 },
  { level: 15, crystals: 29, creditMult: 58, xpMult: 290 },
  { level: 16, crystals: 37, creditMult: 74, xpMult: 370 },
  { level: 17, crystals: 46, creditMult: 92, xpMult: 460 },
  { level: 18, crystals: 56, creditMult: 112, xpMult: 560 },
  { level: 19, crystals: 67, creditMult: 134, xpMult: 670 },
  { level: 20, crystals: 79, creditMult: 158, xpMult: 790 },
  { level: 21, crystals: 92, creditMult: 184, xpMult: 920 },
  { level: 22, crystals: 106, creditMult: 212, xpMult: 1060 },
  { level: 23, crystals: 121, creditMult: 242, xpMult: 1210 },
]
