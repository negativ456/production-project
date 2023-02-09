import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import React from 'react'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

interface LangSwitcherProps {
  className?: string
}
export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { t } = useTranslation()
  const toggle = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
		<Button onClick={toggle}
			theme={ThemeButton.CLEAR}
			className={classNames(cls.LangSwitcher, {}, [className])}>
			{t('Язык')}
		</Button>
  )
}
