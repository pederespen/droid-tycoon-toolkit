import { loadState, saveState } from './persist'

// Display modes for droid lists, shared across pages (Cycle Planner, Rebirths).
// 'list' is text-only; the others show portraits at increasing sizes, like the
// icon-size options in a file explorer.
export type DroidViewMode = 'list' | 'small' | 'medium' | 'large'

const KEY = 'droid-view-mode-v1'
const validModes: DroidViewMode[] = ['list', 'small', 'medium', 'large']

function load(): DroidViewMode {
  const saved = loadState<unknown>(KEY, 'list')
  return validModes.includes(saved as DroidViewMode)
    ? (saved as DroidViewMode)
    : 'list'
}

// Module-scoped so the choice persists while navigating between pages.
export const droidView = $state<{ mode: DroidViewMode }>({ mode: load() })

export function setDroidView(mode: DroidViewMode) {
  droidView.mode = mode
  saveState(KEY, mode)
}
