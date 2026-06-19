import type { Cosmetic } from './types'

// Cosmetic unlocks, grouped by kind. Each entry pairs a cosmetic with the
// requirement needed to unlock it.
export const hats: Cosmetic[] = [
  { kind: 'Hat', name: 'F1l-ON1', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Cone of Coruscant', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Rebel Snapback', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Twin Sunhat', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Speeder Cap', requirement: 'Find in world' },
  { kind: 'Hat', name: "Fennec's Flyer", requirement: 'Find in world' },
  { kind: 'Hat', name: 'Outrider', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Hoth Holiday', requirement: 'Find in world' },
  { kind: 'Hat', name: 'AT-Topper', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Order-67', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Bantha Whip', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Blaster Shade', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Death Star Dish', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Gridcap', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Outeredge', requirement: 'Find in world' },
  { kind: 'Hat', name: 'Bonehead Hat', requirement: 'Mister Bones event' },
]

export const paints: Cosmetic[] = [
  { kind: 'Paint', name: 'Red Paint (default)', requirement: 'None' },
  { kind: 'Paint', name: 'Yellow Paint', requirement: 'None' },
  { kind: 'Paint', name: 'Blue Paint', requirement: 'Rebirth 1 time' },
  { kind: 'Paint', name: 'Gold Paint', requirement: 'Rebirth 5 times' },
  { kind: 'Paint', name: 'Diamond Paint', requirement: 'Rebirth 10 times' },
  { kind: 'Paint', name: 'Rainbow Paint', requirement: 'Rebirth 15 times' },
  {
    kind: 'Paint',
    name: 'Worker Green Paint',
    requirement: 'Craft 100 droids',
  },
  {
    kind: 'Paint',
    name: 'Battle Orange Paint',
    requirement: 'Craft 250 droids',
  },
  {
    kind: 'Paint',
    name: 'Astromech Purple Paint',
    requirement: 'Craft 500 droids',
  },
  {
    kind: 'Paint',
    name: 'Flawless Paint',
    requirement: 'Craft 15 flawless droids',
  },
  {
    kind: 'Paint',
    name: 'Super Flawless Paint',
    requirement: 'Craft 50 flawless droids',
  },
  {
    kind: 'Paint',
    name: 'Ringmaster Paint',
    requirement: 'Fly through every ring',
  },
  {
    kind: 'Paint',
    name: 'Beskar Paint',
    requirement: 'Collect 25 different Beskar droids',
  },
  {
    kind: 'Paint',
    name: 'Super Beskar Paint',
    requirement: 'Collect 50 different Beskar droids',
  },
  {
    kind: 'Paint',
    name: 'Resistance Regalia Paint',
    requirement: 'BB8 event',
  },
  {
    kind: 'Paint',
    name: 'Mister Bones Paint',
    requirement: 'Mister Bones event',
  },
  {
    kind: 'Paint',
    name: 'Mandalorian Workshop Paint',
    requirement: 'Mandalorian event',
  },
  {
    kind: 'Paint',
    name: 'Nova Crystal Stage 1',
    requirement: 'Unlock with Nova Crystals (30)',
  },
  {
    kind: 'Paint',
    name: 'Nova Crystal Stage 2',
    requirement: 'Unlock with Nova Crystals (120 + Stage 1)',
  },
  {
    kind: 'Paint',
    name: 'Nova Crystal Stage 3',
    requirement: 'Unlock with Nova Crystals (??? + Stage 2)',
  },
  { kind: 'Paint', name: 'DJ R-3X Paint', requirement: 'DJ R-3X event' },
]

export const effects: Cosmetic[] = [
  { kind: 'Effect', name: 'Groovy Aura', requirement: 'DJ R-3X event' },
]
