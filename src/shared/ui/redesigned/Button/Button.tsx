import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import React, { type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonSize = 'm' | 'l' | 'xl';
type ButtonProps = {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, variant = 'outline', square = false, disabled, size = 'm', ...otherProps } = props;
  return (
    <button
      disabled={disabled}
      className={classNames(cls.Button, { [cls.square]: square }, [className, variant && cls[variant], cls[size]])}
      {...otherProps}>
      {children}
    </button>
  );
};
