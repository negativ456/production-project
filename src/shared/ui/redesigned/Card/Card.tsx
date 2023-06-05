import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  borderRadius?: CardBorderRadius;
}

export type CardVariant = 'normal' | 'outlined';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorderRadius = '12' | '40';

const mapPaddingToClass: Record<CardPadding, string> = {
  0: 'gap_0',
  8: 'gap_8',
  16: 'gap_16',
  24: 'gap_24',
};

const mapRadiusToClass: Record<CardBorderRadius, string> = {
  12: 'radius_12',
  40: 'radius_40',
};

export const Card = ({
  className,
  children,
  variant = 'normal',
  max,
  borderRadius = '12',
  padding = '8',
  ...otherProps
}: CardProps) => {
  const gapClass = mapPaddingToClass[padding];
  const radiusClass = mapRadiusToClass[borderRadius];
  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [className, cls[variant], cls[gapClass], cls[radiusClass]])}
      {...otherProps}>
      {children}
    </div>
  );
};
