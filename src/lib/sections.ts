import type { Component } from 'svelte'
import type { IconName } from './components/Icon.svelte'
import CosmeticsSection from './components/sections/CosmeticsSection.svelte'
import CycleFinderSection from './components/sections/CycleFinderSection.svelte'
import CyclePlannerSection from './components/sections/CyclePlannerSection.svelte'
import DroidsSection from './components/sections/DroidsSection.svelte'
import EconomySection from './components/sections/EconomySection.svelte'
import NovaSection from './components/sections/NovaSection.svelte'
import RebirthsSection from './components/sections/RebirthsSection.svelte'
import { effects, hats, paints } from './cosmeticsData'
import { droids } from './droidsData'
import { droidEconomy } from './economyData'
import { novaUpgrades, superRebirthPathCount } from './novaData'
import { rebirthSteps } from './rebirthData'

export type SectionId =
  | 'cycle-finder'
  | 'cycle-planner'
  | 'droids'
  | 'economy'
  | 'rebirths'
  | 'nova'
  | 'cosmetics'

export type SectionGroup = 'Tools' | 'Reference'

export type Section = {
  id: SectionId
  label: string
  path: string
  icon: IconName
  group: SectionGroup
  description: string
  count: number
  countLabel: string
  component: Component
}

export const sections: Section[] = [
  {
    id: 'cycle-finder',
    label: 'Cycle Finder',
    path: '/cycle-finder',
    icon: 'compass',
    group: 'Tools',
    description:
      'Enter your next rebirth’s three droids to find which Super Rebirth cycle you’re on.',
    count: superRebirthPathCount,
    countLabel: 'cycles',
    component: CycleFinderSection,
  },
  {
    id: 'cycle-planner',
    label: 'Cycle Planner',
    path: '/cycle-planner',
    icon: 'layers',
    group: 'Tools',
    description:
      'See every droid a Super Rebirth cycle needs, at the highest variant required, for any rebirth range.',
    count: superRebirthPathCount,
    countLabel: 'cycles',
    component: CyclePlannerSection,
  },
  {
    id: 'droids',
    label: 'Droids',
    path: '/droids',
    icon: 'droids',
    group: 'Reference',
    description:
      'The full droid roster grouped by rarity, with slot type for every unit.',
    count: droids.length,
    countLabel: 'droids',
    component: DroidsSection,
  },
  {
    id: 'economy',
    label: 'Economy',
    path: '/economy',
    icon: 'economy',
    group: 'Reference',
    description:
      'Cost, income and sell value for every variant, plus upgrade chips and flawless odds.',
    count: droidEconomy.length,
    countLabel: 'droids priced',
    component: EconomySection,
  },
  {
    id: 'rebirths',
    label: 'Rebirths',
    path: '/rebirths',
    icon: 'rebirths',
    group: 'Reference',
    description:
      'Every rebirth step with all four requirement cycles and what each unlocks.',
    count: rebirthSteps.length,
    countLabel: 'rebirths',
    component: RebirthsSection,
  },
  {
    id: 'nova',
    label: 'Nova Shop',
    path: '/nova',
    icon: 'nova',
    group: 'Reference',
    description:
      'Nova Crystal upgrade tracks and the Super Rebirth crystal & multiplier rewards.',
    count: novaUpgrades.length,
    countLabel: 'upgrades',
    component: NovaSection,
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics',
    path: '/cosmetics',
    icon: 'cosmetics',
    group: 'Reference',
    description:
      'Hats, base paints and droid effects with their unlock requirements.',
    count: hats.length + paints.length + effects.length,
    countLabel: 'cosmetics',
    component: CosmeticsSection,
  },
]

export const sectionByPath = (path: string): Section | undefined =>
  sections.find((section) => section.path === path)

export const sectionGroups: { label: SectionGroup; sections: Section[] }[] = (
  ['Tools', 'Reference'] as SectionGroup[]
).map((label) => ({
  label,
  sections: sections.filter((section) => section.group === label),
}))
