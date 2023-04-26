import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import React, { memo } from 'react'
import { Button, ButtonTheme } from '../Button/Button'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}
export const LangSwitcher: React.FC<LangSwitcherProps> = memo(({ className, short }: LangSwitcherProps) => {
  const { t } = useTranslation()
  const toggle = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
		<Button onClick={toggle}
			theme={ButtonTheme.CLEAR}
			className={classNames(cls.LangSwitcher, {}, [className])}>
			{t(short ? 'Короткий язык' : 'Язык')}
		</Button>
  )
})
