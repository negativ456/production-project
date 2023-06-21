import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import React, { type ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { PolymorphicComponentProp } from '@/shared/types/ui';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';
type ButtonProps = {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const defaultButtonTag = 'button';

export const Button = <E extends ElementType = typeof defaultButtonTag>(
  props: PolymorphicComponentProp<E, ButtonProps>
) => {
  const {
    className,
    children,
    variant = 'outline',
    addonLeft,
    addonRight,
    square = false,
    color = 'normal',
    disabled,
    as,
    size = 'm',
    ...otherProps
  } = props;

  const Tag = as ?? defaultButtonTag;
  return (
    <Tag
      disabled={disabled}
      className={classNames(cls.Button, { [cls.square]: square }, [
        className,
        variant && cls[variant],
        cls[size],
        cls[color],
      ])}
      {...otherProps}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </Tag>
  );
};
