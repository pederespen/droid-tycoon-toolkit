export type Theme = 'light' | 'dark'

const isDark = () => document.documentElement.classList.contains('dark')

export const getTheme = (): Theme => (isDark() ? 'dark' : 'light')

export const setTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('theme', theme)
}

export const toggleTheme = (): Theme => {
  const next: Theme = isDark() ? 'light' : 'dark'
  setTheme(next)
  return next
}
