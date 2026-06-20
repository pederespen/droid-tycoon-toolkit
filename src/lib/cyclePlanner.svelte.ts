import { rebirthSteps } from './rebirthData'

// Cycle Planner input state, kept at module scope so it survives the section
// being unmounted and remounted when the user navigates between pages.
const minLevel = rebirthSteps[0].from
const maxLevel = rebirthSteps[rebirthSteps.length - 1].to

export const cyclePlanner = $state({
  cycle: '',
  fromLevel: String(minLevel),
  toLevel: String(maxLevel),
  search: '',
})

export function resetCyclePlanner() {
  cyclePlanner.cycle = ''
  cyclePlanner.fromLevel = String(minLevel)
  cyclePlanner.toLevel = String(maxLevel)
  cyclePlanner.search = ''
}
