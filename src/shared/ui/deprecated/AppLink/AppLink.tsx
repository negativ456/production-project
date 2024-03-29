import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, type LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INVERTED_PRIMARY = 'inverted-primary',
  NO_UNDERLINE = 'no-underline',
}
type AppLinkProps = {
  className?: string;
  theme?: AppLinkTheme;
} & LinkProps;

/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const AppLink: React.FC<AppLinkProps> = (props) => {
  const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;
  return (
    <Link to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])} {...otherProps}>
      {children}
    </Link>
  );
};
