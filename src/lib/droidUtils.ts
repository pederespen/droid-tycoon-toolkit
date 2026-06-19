import type {
  RebirthStep,
  Requirement,
  RequirementMatch,
  RebirthCycleMatch,
  Rarity,
  Variant,
} from './types'

export const variants: Variant[] = [
  'Basic',
  'Gold',
  'Diamond',
  'Rainbow',
  'Beskar',
]
export const variantRank = new Map<Variant, number>(
  variants.map((variant, index) => [variant, index]),
)

export const req = (
  variant: Variant,
  name: string,
  rarity: Rarity,
): Requirement => ({ variant, name, rarity })

export const formatRequirement = (requirement: Requirement) =>
  `${requirement.variant} ${requirement.name}`

export const normalizeDroidName = (name: string) =>
  name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace('WLKR', 'WALKER')
    .replace('WALKR', 'WALKER')
    .replace('STRK', 'STRIKE')

export const getDroidNames = (rebirthSteps: RebirthStep[]) =>
  Array.from(
    new Map(
      rebirthSteps
        .flatMap((step) => step.patterns.flat())
        .map((requirement) => [
          normalizeDroidName(requirement.name),
          requirement.name,
        ]),
    ).values(),
  ).sort((first, second) => first.localeCompare(second))

export const getCoveredFutureMatches = (
  rebirthSteps: RebirthStep[],
  currentLevel: number,
  activePattern: number,
  ownedVariant: Variant,
  selectedDroid: string,
): RequirementMatch[] =>
  rebirthSteps
    .filter((step) => step.from >= currentLevel)
    .map((step) => ({
      step,
      requirements: step.patterns[activePattern].filter(
        (requirement) =>
          normalizeDroidName(requirement.name) ===
            normalizeDroidName(selectedDroid) &&
          (variantRank.get(ownedVariant) ?? 0) >=
            (variantRank.get(requirement.variant) ?? 0),
      ),
    }))
    .filter((match) => match.requirements.length > 0)

export const getExactFutureMatches = (
  rebirthSteps: RebirthStep[],
  currentLevel: number,
  activePattern: number,
  selectedDroid: string,
): RequirementMatch[] =>
  rebirthSteps
    .filter((step) => step.from >= currentLevel)
    .map((step) => ({
      step,
      requirements: step.patterns[activePattern].filter(
        (requirement) =>
          normalizeDroidName(requirement.name) ===
          normalizeDroidName(selectedDroid),
      ),
    }))
    .filter((match) => match.requirements.length > 0)

// Given the three droids a player sees for their next rebirth, find which
// Super Rebirth path(s) those droids belong to. The player's current rebirth
// level pins the exact step (the next rebirth is the step whose `from` equals
// the current level), so droids that recur across steps no longer cause false
// matches. Each step has four patterns (paths 1–4); a path that matches the
// entered droid set reveals the player's current Super Rebirth cycle. Matching
// is order-independent and uses droid names only (variants are shown in the
// result for confirmation).
export const findRebirthCycleMatches = (
  rebirthSteps: RebirthStep[],
  currentLevel: number,
  droidNames: string[],
): RebirthCycleMatch[] => {
  const target = droidNames.map(normalizeDroidName).filter(Boolean)
  if (target.length !== 3) return []
  const targetKey = [...target].sort().join('|')

  const step = rebirthSteps.find((candidate) => candidate.from === currentLevel)
  if (!step) return []

  const matches: RebirthCycleMatch[] = []
  step.patterns.forEach((requirements, pathIndex) => {
    const patternKey = requirements
      .map((requirement) => normalizeDroidName(requirement.name))
      .sort()
      .join('|')
    if (patternKey === targetKey) {
      matches.push({ cycle: pathIndex + 1, step, requirements })
    }
  })
  return matches
}
