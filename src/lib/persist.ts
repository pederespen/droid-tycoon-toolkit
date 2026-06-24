// Tiny helpers for persisting UI filter state to localStorage. Storage may be
// unavailable (private mode / quota) or hold stale data, so both read and write
// fail silently and fall back to sensible defaults.
export function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveState(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: persistence is best-effort.
  }
}
