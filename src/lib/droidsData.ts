import type { Droid } from './types'

// The full droid roster. Iconic droids only have a Base variant; every other
// droid can also be collected in Gold, Diamond, Rainbow, Beskar and Flawless.
export const droids: Droid[] = [
  // Common
  { name: 'Mouse', type: 'Worker', category: 'Common' },
  { name: 'PIT', type: 'Worker', category: 'Common' },
  { name: 'Gonk', type: 'Worker', category: 'Common' },
  { name: 'CB', type: 'Astromech', category: 'Common' },
  { name: 'R3', type: 'Astromech', category: 'Common' },
  { name: 'R5', type: 'Astromech', category: 'Common' },
  { name: 'R8', type: 'Astromech', category: 'Common' },
  { name: 'Imperial Probe', type: 'Battle', category: 'Common' },
  { name: 'B1 Battle', type: 'Battle', category: 'Common' },
  { name: 'DRK-1 Probe', type: 'Battle', category: 'Common' },
  { name: 'ID10', type: 'Battle', category: 'Common' },

  // Rare
  { name: 'BDX Explorer', type: 'Worker', category: 'Rare' },
  { name: 'ARG', type: 'Worker', category: 'Rare' },
  { name: 'Senate Hovercam', type: 'Worker', category: 'Rare' },
  { name: 'BU-4D', type: 'Worker', category: 'Rare' },
  { name: 'BAL-Core', type: 'Worker', category: 'Rare' },
  { name: 'ROLL-R', type: 'Worker', category: 'Rare' },
  { name: '2BB', type: 'Astromech', category: 'Rare' },
  { name: 'A-LT', type: 'Astromech', category: 'Rare' },
  { name: 'R4', type: 'Astromech', category: 'Rare' },
  { name: 'R9', type: 'Astromech', category: 'Rare' },
  { name: 'B1 Security', type: 'Battle', category: 'Rare' },
  { name: 'NAV-EX', type: 'Battle', category: 'Rare' },
  { name: 'VECT-ARM', type: 'Battle', category: 'Rare' },
  { name: 'HOV-R', type: 'Battle', category: 'Rare' },

  // Epic
  { name: 'Groundmech', type: 'Worker', category: 'Epic' },
  { name: 'LO', type: 'Worker', category: 'Epic' },
  { name: 'AMP Walker', type: 'Worker', category: 'Epic' },
  { name: 'SEN-TRI', type: 'Worker', category: 'Epic' },
  { name: 'OPTI-Pod', type: 'Worker', category: 'Epic' },
  { name: 'Gunrunner', type: 'Worker', category: 'Epic' },
  { name: 'BB', type: 'Astromech', category: 'Epic' },
  { name: 'R2', type: 'Astromech', category: 'Epic' },
  { name: 'R6', type: 'Astromech', category: 'Epic' },
  { name: 'TRAK-R', type: 'Astromech', category: 'Epic' },
  { name: 'Orb-Walker', type: 'Astromech', category: 'Epic' },
  { name: 'UTIL-TEC', type: 'Astromech', category: 'Epic' },
  { name: 'B1 Heavy', type: 'Battle', category: 'Epic' },
  { name: 'B2 Super', type: 'Battle', category: 'Epic' },
  { name: 'B2 Heavy', type: 'Battle', category: 'Epic' },
  { name: 'Strike-Orb', type: 'Battle', category: 'Epic' },
  { name: 'HAUL-R', type: 'Battle', category: 'Epic' },
  { name: 'LNG-Shot', type: 'Battle', category: 'Epic' },

  // Legendary
  { name: 'Proto-Roller', type: 'Worker', category: 'Legendary' },
  { name: 'Mecha-Droid', type: 'Worker', category: 'Legendary' },
  { name: 'Mono-Walker', type: 'Worker', category: 'Legendary' },
  { name: 'BB9', type: 'Astromech', category: 'Legendary' },
  { name: 'R7', type: 'Astromech', category: 'Legendary' },
  { name: 'B2-RP', type: 'Battle', category: 'Legendary' },
  { name: 'Cyclo-Grav', type: 'Battle', category: 'Legendary' },
  { name: 'OPTI-Strike', type: 'Battle', category: 'Legendary' },

  // Iconic (Base variant only)
  { name: 'BB8', type: 'Astromech', category: 'Iconic' },
  { name: 'Mister Bones', type: 'Battle', category: 'Iconic' },
  { name: 'IG-11 Marshal', type: 'Battle', category: 'Iconic' },
  { name: 'DJ-R3X', type: 'Worker', category: 'Iconic' },
  { name: 'CB-23', type: 'Astromech', category: 'Iconic' },
]
