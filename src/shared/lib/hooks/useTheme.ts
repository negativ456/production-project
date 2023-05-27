import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '@/shared/const/theme';
interface UseThemeResult {
  theme?: Theme;
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    if (setTheme) {
      setTheme(newTheme);
    }
    document.body.className = newTheme;
    saveAction?.(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
}
