// Tiny client-side router built on the History API. Exposes a reactive
// `path` and a `navigate` helper. Vite's dev server (and most static hosts
// with SPA fallback) serve index.html for any path, so deep links work.

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

  window.addEventListener('popstate', () => {
    path = stripBase(window.location.pathname)
  })

  return {
    get path() {
      return path
    },
    navigate(to: string) {
      if (to === path) return
      window.history.pushState({}, '', base + to)
      path = to
      window.scrollTo({ top: 0 })
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
