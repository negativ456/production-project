import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import React, { type ButtonHTMLAttributes } from 'react'

export enum ThemeButton {
  CLEAR = 'clear',

}
type ButtonProps = {
  className?: string
  theme?: ThemeButton
} & ButtonHTMLAttributes<HTMLButtonElement>
export const Button: React.FC<ButtonProps> = props => {
  const {
    className,
    children,
    theme,
    ...otherProps
  } = props
  return (
		<button className={classNames(cls.Button, {}, [className, cls[theme]])} {...otherProps}>
			{children}
		</button>
  )
}
