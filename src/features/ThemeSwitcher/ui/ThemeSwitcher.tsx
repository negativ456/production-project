import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { memo } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg'
import { Theme } from '@/app/providers/ThemeProvider'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

interface ThemeSwitcherProps {
  className?: string
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  return (
		<Button theme={ButtonTheme.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
			<ThemeIcon fill={theme === Theme.LIGHT ? '#FFC700' : '#0115C6'}/>
		</Button>
  )
})
