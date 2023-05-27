import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  children?: ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
  const [isThemeInited, setIsThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme]);
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
