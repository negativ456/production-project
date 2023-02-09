import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => (
	<div className={classNames(cls.Navbar, {}, [className])}>
		<div className={cls.links}>
			<AppLink theme={AppLinkTheme.PRIMARY} to='/'>Main</AppLink>
			<AppLink theme={AppLinkTheme.SECONDARY} to='/about'>About</AppLink>
		</div>
	</div>
)
