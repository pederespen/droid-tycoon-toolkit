// Tiny client-side router built on the History API. Exposes a reactive
// `path` and a `navigate` helper. Vite's dev server (and most static hosts
// with SPA fallback) serve index.html for any path, so deep links work.

import { tick } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

// When deployed under a sub-path (e.g. GitHub Pages project page at
// `/droid-tycoon-toolkit/`), Vite injects that prefix as `BASE_URL`. We strip
// it on reads and add it back on writes so the rest of the app can keep using
// clean, root-relative paths like `/rebirths`.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function stripBase(pathname: string): string {
  const stripped = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname
  return stripped === '' ? '/' : stripped
}

// Resolves an app path (e.g. `/rebirths`) to a real URL including the base
// prefix, for use in anchor `href`s so middle-click / open-in-new-tab work.
export const href = (to: string): string => base + to

function createRouter() {
  let path = $state(stripBase(window.location.pathname))

  // Remember each page's scroll offset so returning to it restores the user's
  // place instead of jumping to the top. We manage this ourselves, so disable
  // the browser's built-in restoration to avoid it fighting us.
  const scrollPositions = new SvelteMap<string, number>()
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  // Wait for the new section to render, then jump to its remembered offset.
  async function restoreScroll(to: string) {
    await tick()
    window.scrollTo({ top: scrollPositions.get(to) ?? 0 })
  }

  window.addEventListener('popstate', () => {
    scrollPositions.set(path, window.scrollY)
    const next = stripBase(window.location.pathname)
    path = next
    restoreScroll(next)
  })

  return {
    get path() {
      return path
    },
    navigate(to: string) {
      if (to === path) return
      scrollPositions.set(path, window.scrollY)
      window.history.pushState({}, '', base + to)
      path = to
      restoreScroll(to)
    },
  }
}

export const router = createRouter()

// Intercepts an anchor click so navigation stays client-side while still
// rendering as a real, copyable link. Falls through for modified clicks
// (new tab, etc.).
export const handleLinkClick = (event: MouseEvent, to: string) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }
  event.preventDefault()
  router.navigate(to)
}
