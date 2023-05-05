import React, { ReactNode, useMemo, useState } from 'react'
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorageKeys'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
  children?: ReactNode
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const defaultProps = useMemo(() => ({
    theme,
    setTheme
  }), [theme])

  return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
  )
}
