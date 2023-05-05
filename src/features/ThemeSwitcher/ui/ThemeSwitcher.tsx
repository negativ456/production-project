import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { memo } from 'react'
import { useTheme } from '@/shared/lib/hooks/useTheme'
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Theme } from '@/shared/const/theme'

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
