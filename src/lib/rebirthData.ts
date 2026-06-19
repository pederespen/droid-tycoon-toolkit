import { req } from './droidUtils'
import type { RebirthStep } from './types'

export const rebirthSteps: RebirthStep[] = [
  {
    from: 0,
    to: 1,
    cost: '10K',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Basic', 'CB', 'Common'),
        req('Basic', 'PIT', 'Common'),
        req('Basic', 'DRK-1 Probe', 'Common'),
      ],
      [
        req('Basic', 'ID10', 'Common'),
        req('Basic', 'Mouse', 'Common'),
        req('Basic', 'Gonk', 'Common'),
      ],
      [
        req('Basic', 'Mouse', 'Common'),
        req('Basic', 'PIT', 'Common'),
        req('Basic', 'Gonk', 'Common'),
      ],
      [
        req('Basic', 'ID10', 'Common'),
        req('Basic', 'PIT', 'Common'),
        req('Basic', 'DRK-1 Probe', 'Common'),
      ],
    ],
  },
  {
    from: 1,
    to: 2,
    cost: '150K',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Basic', 'BDX Explorer', 'Rare'),
        req('Basic', '2BB', 'Rare'),
        req('Basic', 'BAL-Core', 'Rare'),
      ],
      [
        req('Basic', 'ROLL-R', 'Rare'),
        req('Basic', 'Senate Hovercam', 'Rare'),
        req('Basic', 'NAV-EX', 'Rare'),
      ],
      [
        req('Basic', '2BB', 'Rare'),
        req('Basic', 'R3', 'Common'),
        req('Basic', 'Senate Hovercam', 'Rare'),
      ],
      [
        req('Basic', '2BB', 'Rare'),
        req('Basic', 'R3', 'Common'),
        req('Basic', 'Senate Hovercam', 'Rare'),
      ],
    ],
  },
  {
    from: 2,
    to: 3,
    cost: '975K',
    unlock: 'Battle slot',
    patterns: [
      [
        req('Basic', 'A-LT', 'Rare'),
        req('Basic', 'BU-4D', 'Rare'),
        req('Gold', 'R9', 'Rare'),
      ],
      [
        req('Basic', 'R4', 'Rare'),
        req('Basic', 'VECT-ARM', 'Rare'),
        req('Gold', 'BDX Explorer', 'Rare'),
      ],
      [
        req('Basic', 'R4', 'Rare'),
        req('Basic', 'R5', 'Common'),
        req('Basic', 'R8', 'Rare'),
      ],
      [
        req('Gold', 'R5', 'Common'),
        req('Gold', 'R8', 'Common'),
        req('Basic', 'R4', 'Rare'),
      ],
    ],
  },
  {
    from: 3,
    to: 4,
    cost: '2.95M',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Gold', 'ARG', 'Rare'),
        req('Gold', 'B1 Security', 'Rare'),
        req('Basic', 'Groundmech', 'Epic'),
      ],
      [
        req('Gold', '2BB', 'Rare'),
        req('Gold', 'BAL-Core', 'Rare'),
        req('Basic', 'Orb-Walker', 'Epic'),
      ],
      [
        req('Gold', 'R9', 'Rare'),
        req('Gold', 'B1 Battle', 'Common'),
        req('Gold', 'B1 Security', 'Rare'),
      ],
      [
        req('Gold', 'R9', 'Rare'),
        req('Gold', 'B1 Battle', 'Common'),
        req('Gold', 'B1 Security', 'Rare'),
      ],
    ],
  },
  {
    from: 4,
    to: 5,
    cost: '5.35M',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Gold', 'BU-4D', 'Rare'),
        req('Gold', 'HOV-R', 'Rare'),
        req('Diamond', 'R9', 'Rare'),
      ],
      [
        req('Gold', 'R4', 'Rare'),
        req('Gold', 'VECT-ARM', 'Rare'),
        req('Gold', 'NAV-EX', 'Rare'),
      ],
      [
        req('Gold', '2BB', 'Rare'),
        req('Gold', 'R3', 'Common'),
        req('Gold', 'Senate Hovercam', 'Rare'),
      ],
      [
        req('Gold', '2BB', 'Rare'),
        req('Gold', 'R3', 'Common'),
        req('Gold', 'Senate Hovercam', 'Rare'),
      ],
    ],
  },
  {
    from: 5,
    to: 6,
    cost: '9.85M',
    unlock: 'Battle slot',
    patterns: [
      [
        req('Gold', 'Groundmech', 'Epic'),
        req('Diamond', 'ARG', 'Rare'),
        req('Diamond', 'A-LT', 'Rare'),
      ],
      [
        req('Basic', 'Gunrunner', 'Epic'),
        req('Diamond', '2BB', 'Rare'),
        req('Diamond', 'BAL-Core', 'Rare'),
      ],
      [
        req('Diamond', 'BDX Explorer', 'Rare'),
        req('Diamond', 'R4', 'Rare'),
        req('Diamond', 'R5', 'Common'),
      ],
      [
        req('Diamond', 'BDX Explorer', 'Rare'),
        req('Diamond', 'R4', 'Rare'),
        req('Diamond', 'R5', 'Common'),
      ],
    ],
  },
  {
    from: 6,
    to: 7,
    cost: '14.5M',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Gold', 'BB', 'Epic'),
        req('Diamond', 'B1 Security', 'Rare'),
        req('Diamond', 'BU-4D', 'Rare'),
      ],
      [
        req('Diamond', 'ROLL-R', 'Rare'),
        req('Diamond', 'BDX Explorer', 'Rare'),
        req('Gold', 'R2', 'Epic'),
      ],
      [
        req('Diamond', 'R8', 'Common'),
        req('Diamond', 'R9', 'Rare'),
        req('Diamond', 'B1 Battle', 'Common'),
      ],
      [
        req('Diamond', 'R8', 'Common'),
        req('Diamond', 'R9', 'Rare'),
        req('Diamond', 'B1 Battle', 'Common'),
      ],
    ],
  },
  {
    from: 7,
    to: 8,
    cost: '36M',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Gold', 'UTIL-TEC', 'Epic'),
        req('Gold', 'LO', 'Epic'),
        req('Diamond', 'HOV-R', 'Rare'),
      ],
      [
        req('Diamond', 'R4', 'Rare'),
        req('Gold', 'B2 Super', 'Epic'),
        req('Gold', 'Gunrunner', 'Epic'),
      ],
      [
        req('Rainbow', 'B1 Security', 'Rare'),
        req('Rainbow', 'R3', 'Common'),
        req('Rainbow', '2BB', 'Rare'),
      ],
      [
        req('Rainbow', 'B1 Security', 'Rare'),
        req('Rainbow', 'R3', 'Common'),
        req('Rainbow', '2BB', 'Rare'),
      ],
    ],
  },
  {
    from: 8,
    to: 9,
    cost: '89M',
    unlock: 'Battle slot',
    patterns: [
      [
        req('Rainbow', 'Groundmech', 'Epic'),
        req('Gold', 'R6', 'Epic'),
        req('Gold', 'TRAK-R', 'Epic'),
      ],
      [
        req('Rainbow', 'NAV-EX', 'Rare'),
        req('Gold', 'Strike-Orb', 'Epic'),
        req('Gold', 'AMP Walker', 'Epic'),
      ],
      [
        req('Rainbow', 'BDX Explorer', 'Rare'),
        req('Rainbow', 'R4', 'Rare'),
        req('Rainbow', 'R5', 'Common'),
      ],
      [
        req('Rainbow', 'BDX Explorer', 'Rare'),
        req('Rainbow', 'R4', 'Rare'),
        req('Rainbow', 'R5', 'Common'),
      ],
    ],
  },
  {
    from: 9,
    to: 10,
    cost: '220M',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Rainbow', 'LO', 'Epic'),
        req('Rainbow', 'HAUL-R', 'Epic'),
        req('Gold', 'Strike-Orb', 'Epic'),
      ],
      [
        req('Rainbow', 'VECT-ARM', 'Rare'),
        req('Diamond', 'R2', 'Epic'),
        req('Diamond', 'B2 Super', 'Epic'),
      ],
      [
        req('Rainbow', 'Senate Hovercam', 'Rare'),
        req('Basic', 'Groundmech', 'Epic'),
        req('Basic', 'TRAK-R', 'Epic'),
      ],
      [
        req('Rainbow', 'Senate Hovercam', 'Rare'),
        req('Basic', 'Groundmech', 'Epic'),
        req('Basic', 'TRAK-R', 'Epic'),
      ],
    ],
  },
  {
    from: 10,
    to: 11,
    cost: '550M',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Rainbow', 'AMP Walker', 'Epic'),
        req('Rainbow', 'B1 Heavy', 'Epic'),
        req('Basic', 'BB9', 'Legendary'),
      ],
      [
        req('Diamond', 'Strike-Orb', 'Epic'),
        req('Diamond', 'B2 Heavy', 'Epic'),
        req('Rainbow', 'BAL-Core', 'Rare'),
      ],
      [
        req('Basic', 'B2 Heavy', 'Epic'),
        req('Basic', 'B2 Super', 'Epic'),
        req('Basic', 'UTIL-TEC', 'Epic'),
      ],
      [
        req('Basic', 'B2 Heavy', 'Epic'),
        req('Basic', 'B2 Super', 'Epic'),
        req('Basic', 'UTIL-TEC', 'Epic'),
      ],
    ],
  },
  {
    from: 11,
    to: 12,
    cost: '1.36B',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Gold', 'Proto-Roller', 'Legendary'),
        req('Basic', 'Mecha-Droid', 'Legendary'),
        req('Basic', 'Mono-Walker', 'Legendary'),
      ],
      [
        req('Rainbow', 'Orb-Walker', 'Epic'),
        req('Rainbow', 'R2', 'Epic'),
        req('Basic', 'BB9', 'Legendary'),
      ],
      [
        req('Gold', 'TRAK-R', 'Epic'),
        req('Gold', 'Groundmech', 'Epic'),
        req('Rainbow', 'BAL-Core', 'Rare'),
      ],
      [
        req('Rainbow', 'BAL-Core', 'Rare'),
        req('Gold', 'Groundmech', 'Epic'),
        req('Gold', 'TRAK-R', 'Epic'),
      ],
    ],
  },
  {
    from: 12,
    to: 13,
    cost: '3.40B',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Basic', 'R7', 'Legendary'),
        req('Basic', 'Cyclo-Grav', 'Legendary'),
        req('Basic', 'B2-RP', 'Legendary'),
      ],
      [
        req('Rainbow', 'B2 Super', 'Epic'),
        req('Basic', 'Mecha-Droid', 'Legendary'),
        req('Basic', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Rainbow', 'B2 Super', 'Epic'),
        req('Basic', 'Mecha-Droid', 'Legendary'),
        req('Basic', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Rainbow', 'B2 Super', 'Epic'),
        req('Basic', 'Mecha-Droid', 'Legendary'),
        req('Basic', 'Proto-Roller', 'Legendary'),
      ],
    ],
  },
  {
    from: 13,
    to: 14,
    cost: '8.45B',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Basic', 'OPTI-Strike', 'Legendary'),
        req('Gold', 'Mono-Walker', 'Legendary'),
        req('Gold', 'Mecha-Droid', 'Legendary'),
      ],
      [
        req('Rainbow', 'B2 Heavy', 'Epic'),
        req('Basic', 'B2-RP', 'Legendary'),
        req('Gold', 'R7', 'Legendary'),
      ],
      [
        req('Rainbow', 'B2 Heavy', 'Epic'),
        req('Basic', 'B2-RP', 'Legendary'),
        req('Gold', 'R7', 'Legendary'),
      ],
      [
        req('Diamond', 'BAL-Core', 'Rare'),
        req('Diamond', 'Groundmech', 'Epic'),
        req('Rainbow', 'TRAK-R', 'Epic'),
      ],
    ],
  },
  {
    from: 14,
    to: 15,
    cost: '21.00B',
    unlock: 'Astromech slot',
    patterns: [
      [
        req('Gold', 'B2-RP', 'Legendary'),
        req('Gold', 'BB9', 'Legendary'),
        req('Gold', 'R7', 'Legendary'),
      ],
      [
        req('Rainbow', 'Strike-Orb', 'Epic'),
        req('Gold', 'BB9', 'Legendary'),
        req('Gold', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Rainbow', 'Strike-Orb', 'Epic'),
        req('Gold', 'BB9', 'Legendary'),
        req('Gold', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Diamond', 'B2 Heavy', 'Epic'),
        req('Rainbow', 'B2 Super', 'Epic'),
        req('Basic', 'B2-RP', 'Legendary'),
      ],
    ],
  },
  {
    from: 15,
    to: 16,
    cost: '52.00B',
    unlock: 'Worker slot',
    patterns: [
      [
        req('Gold', 'OPTI-Strike', 'Legendary'),
        req('Diamond', 'Mono-Walker', 'Legendary'),
        req('Diamond', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Diamond', 'B2-RP', 'Legendary'),
        req('Rainbow', 'AMP Walker', 'Epic'),
        req('Gold', 'Mecha-Droid', 'Legendary'),
      ],
      [
        req('Rainbow', 'AMP Walker', 'Epic'),
        req('Diamond', 'B2-RP', 'Legendary'),
        req('Gold', 'Mecha-Droid', 'Legendary'),
      ],
      [
        req('Rainbow', 'UTIL-TEC', 'Epic'),
        req('Basic', 'BB9', 'Legendary'),
        req('Gold', 'R7', 'Legendary'),
      ],
    ],
  },
  {
    from: 16,
    to: 17,
    cost: '130.00B',
    unlock: 'Lounge slot',
    patterns: [
      [
        req('Diamond', 'B2-RP', 'Legendary'),
        req('Diamond', 'Cyclo-Grav', 'Legendary'),
        req('Diamond', 'Mecha-Droid', 'Legendary'),
      ],
      [
        req('Rainbow', 'OPTI-Pod', 'Epic'),
        req('Diamond', 'R7', 'Legendary'),
        req('Gold', 'Mono-Walker', 'Legendary'),
      ],
      [
        req('Rainbow', 'OPTI-Pod', 'Epic'),
        req('Diamond', 'R7', 'Legendary'),
        req('Gold', 'Mono-Walker', 'Legendary'),
      ],
      [
        req('Basic', 'OPTI-Strike', 'Legendary'),
        req('Gold', 'Cyclo-Grav', 'Legendary'),
        req('Gold', 'Mecha-Droid', 'Legendary'),
      ],
    ],
  },
  {
    from: 17,
    to: 18,
    cost: '325.00B',
    unlock: 'Lounge slot',
    patterns: [
      [
        req('Diamond', 'BB9', 'Legendary'),
        req('Diamond', 'R7', 'Legendary'),
        req('Rainbow', 'Mono-Walker', 'Legendary'),
      ],
      [
        req('Rainbow', 'UTIL-TEC', 'Epic'),
        req('Diamond', 'BB9', 'Legendary'),
        req('Diamond', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Rainbow', 'UTIL-TEC', 'Epic'),
        req('Diamond', 'BB9', 'Legendary'),
        req('Diamond', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Gold', 'B2-RP', 'Legendary'),
        req('Gold', 'BB9', 'Legendary'),
        req('Diamond', 'R7', 'Legendary'),
      ],
    ],
  },
  {
    from: 18,
    to: 19,
    cost: '810.00B',
    unlock: 'Lounge slot',
    patterns: [
      [
        req('Rainbow', 'B2-RP', 'Legendary'),
        req('Rainbow', 'Cyclo-Grav', 'Legendary'),
        req('Rainbow', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Diamond', 'Mecha-Droid', 'Legendary'),
        req('Rainbow', 'R7', 'Legendary'),
        req('Rainbow', 'B2-RP', 'Legendary'),
      ],
      [
        req('Diamond', 'Mecha-Droid', 'Legendary'),
        req('Rainbow', 'R7', 'Legendary'),
        req('Rainbow', 'B2-RP', 'Legendary'),
      ],
      [
        req('Diamond', 'Mecha-Droid', 'Legendary'),
        req('Rainbow', 'R7', 'Legendary'),
        req('Rainbow', 'B2-RP', 'Legendary'),
      ],
    ],
  },
  {
    from: 19,
    to: 20,
    cost: '2.00T',
    unlock: 'Lounge slot',
    patterns: [
      [
        req('Rainbow', 'R7', 'Legendary'),
        req('Rainbow', 'OPTI-Strike', 'Legendary'),
        req('Rainbow', 'Mecha-Droid', 'Legendary'),
      ],
      [
        req('Rainbow', 'Mono-Walker', 'Legendary'),
        req('Rainbow', 'OPTI-Strike', 'Legendary'),
        req('Rainbow', 'Cyclo-Grav', 'Legendary'),
      ],
      [
        req('Rainbow', 'Mono-Walker', 'Legendary'),
        req('Rainbow', 'OPTI-Strike', 'Legendary'),
        req('Rainbow', 'Cyclo-Grav', 'Legendary'),
      ],
      [
        req('Rainbow', 'Mono-Walker', 'Legendary'),
        req('Rainbow', 'OPTI-Strike', 'Legendary'),
        req('Rainbow', 'Cyclo-Grav', 'Legendary'),
      ],
    ],
  },
  {
    from: 20,
    to: 21,
    cost: '3.00T',
    unlock: 'None',
    patterns: [
      [
        req('Beskar', 'BB', 'Epic'),
        req('Beskar', 'Orb-Walker', 'Epic'),
        req('Beskar', 'Groundmech', 'Epic'),
      ],
      [
        req('Beskar', 'LO', 'Epic'),
        req('Beskar', 'R6', 'Epic'),
        req('Beskar', 'HAUL-R', 'Epic'),
      ],
      [
        req('Beskar', 'LO', 'Epic'),
        req('Beskar', 'R6', 'Epic'),
        req('Beskar', 'HAUL-R', 'Epic'),
      ],
      [
        req('Beskar', 'LO', 'Epic'),
        req('Beskar', 'R6', 'Epic'),
        req('Beskar', 'HAUL-R', 'Epic'),
      ],
    ],
  },
  {
    from: 21,
    to: 22,
    cost: '4.50T',
    unlock: 'None',
    patterns: [
      [
        req('Beskar', 'AMP Walker', 'Epic'),
        req('Beskar', 'B1 Heavy', 'Epic'),
        req('Beskar', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Beskar', 'SEN-TRI', 'Epic'),
        req('Beskar', 'Strike-Orb', 'Epic'),
        req('Beskar', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Beskar', 'SEN-TRI', 'Epic'),
        req('Beskar', 'Strike-Orb', 'Epic'),
        req('Beskar', 'Proto-Roller', 'Legendary'),
      ],
      [
        req('Beskar', 'SEN-TRI', 'Epic'),
        req('Beskar', 'Strike-Orb', 'Epic'),
        req('Beskar', 'Proto-Roller', 'Legendary'),
      ],
    ],
  },
  {
    from: 22,
    to: 23,
    cost: '6.00T',
    unlock: 'None',
    patterns: [
      [
        req('Beskar', 'OPTI-Strike', 'Legendary'),
        req('Beskar', 'Mono-Walker', 'Legendary'),
        req('Beskar', 'R7', 'Legendary'),
      ],
      [
        req('Beskar', 'BB9', 'Legendary'),
        req('Beskar', 'Cyclo-Grav', 'Legendary'),
        req('Beskar', 'B2-RP', 'Legendary'),
      ],
      [
        req('Beskar', 'BB9', 'Legendary'),
        req('Beskar', 'Cyclo-Grav', 'Legendary'),
        req('Beskar', 'B2-RP', 'Legendary'),
      ],
      [
        req('Beskar', 'BB9', 'Legendary'),
        req('Beskar', 'Cyclo-Grav', 'Legendary'),
        req('Beskar', 'B2-RP', 'Legendary'),
      ],
    ],
  },
]
