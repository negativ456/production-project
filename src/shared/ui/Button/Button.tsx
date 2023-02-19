import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import React, { type ButtonHTMLAttributes } from 'react'

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted'
}
export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}
type ButtonProps = {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
} & ButtonHTMLAttributes<HTMLButtonElement>
export const Button: React.FC<ButtonProps> = props => {
  const {
    className,
    children,
    theme,
    square = false,
    size = ButtonSize.M,
    ...otherProps
  } = props
  return (
		<button className={classNames(cls.Button, { [cls.square]: square }, [className, theme && cls[theme], cls[size]])} {...otherProps}>
			{children}
		</button>
  )
}
