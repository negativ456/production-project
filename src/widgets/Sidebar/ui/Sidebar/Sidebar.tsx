import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import React, { useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import { useTranslation } from 'react-i18next'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
interface SidebarProps {
  className?: string
}
export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  return (
		<div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.links}>
        <AppLink
            theme={AppLinkTheme.INVERTED_PRIMARY}
            to={RoutePath.main}
            className={cls.link}
        >
          <MainIcon className={cls.icon}/>
          <span>
            {t('Главная')}
          </span>
        </AppLink>
        <AppLink
            theme={AppLinkTheme.INVERTED_PRIMARY}
            to={RoutePath.about}
            className={cls.link}
        >
          <AboutIcon className={cls.icon}/>
          <span>
            {t('О нас')}
          </span>
        </AppLink>
      </div>
			<Button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          theme={ButtonTheme.BACKGROUND_INVERTED}
          size={ButtonSize.L}
          square
          className={cls.toggle}
      >
        {collapsed ? '>' : '<'}
      </Button>
			<div className={cls.switchers}>
				<ThemeSwitcher/>
				<LangSwitcher short={collapsed} className={cls.lang}/>
			</div>
		</div>
  )
}
