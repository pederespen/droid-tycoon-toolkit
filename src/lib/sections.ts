import type { Component } from 'svelte'
import type { IconName } from './components/Icon.svelte'
import CosmeticsSection from './components/sections/CosmeticsSection.svelte'
import DroidsSection from './components/sections/DroidsSection.svelte'
import EconomySection from './components/sections/EconomySection.svelte'
import NovaSection from './components/sections/NovaSection.svelte'
import RebirthsSection from './components/sections/RebirthsSection.svelte'
import { effects, hats, paints } from './cosmeticsData'
import { droids } from './droidsData'
import { droidEconomy } from './economyData'
import { novaUpgrades } from './novaData'
import { rebirthSteps } from './rebirthData'

export type SectionId = 'droids' | 'economy' | 'rebirths' | 'nova' | 'cosmetics'

export type Section = {
  id: SectionId
  label: string
  path: string
  icon: IconName
  description: string
  count: number
  countLabel: string
  component: Component
}

export const sections: Section[] = [
  {
    id: 'droids',
    label: 'Droids',
    path: '/droids',
    icon: 'droids',
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
    description:
      'Hats, base paints and droid effects with their unlock requirements.',
    count: hats.length + paints.length + effects.length,
    countLabel: 'cosmetics',
    component: CosmeticsSection,
  },
]

export const sectionByPath = (path: string): Section | undefined =>
  sections.find((section) => section.path === path)
