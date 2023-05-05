import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorageKeys'
interface UseThemeResult {
  theme?: Theme
  toggleTheme: () => void
}
export function useTheme (): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    if (setTheme) {
      setTheme(newTheme)
    }
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme,
    toggleTheme
  }
}
