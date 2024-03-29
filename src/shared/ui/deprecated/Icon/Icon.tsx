import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Icon = ({ className, Svg, inverted = false, ...otherProps }: IconProps) => {
  return <Svg className={classNames(cls.Icon, { [cls.inverted]: inverted }, [className])} {...otherProps} />;
};
