import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import { Link, type LinkProps } from 'react-router-dom'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}
type AppLinkProps = {
  className?: string
  theme?: AppLinkTheme
} & LinkProps
export const AppLink: React.FC<AppLinkProps> = props => {
  const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props
  return (
		<Link
			to={to}
			className={classNames(cls.AppLink, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</Link>
  )
}
