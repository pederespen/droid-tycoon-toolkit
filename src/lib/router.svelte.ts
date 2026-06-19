// Tiny client-side router built on the History API. Exposes a reactive
// `path` and a `navigate` helper. Vite's dev server (and most static hosts
// with SPA fallback) serve index.html for any path, so deep links work.
function createRouter() {
  let path = $state(window.location.pathname)

  window.addEventListener('popstate', () => {
    path = window.location.pathname
  })

  return {
    get path() {
      return path
    },
    navigate(to: string) {
      if (to === path) return
      window.history.pushState({}, '', to)
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
