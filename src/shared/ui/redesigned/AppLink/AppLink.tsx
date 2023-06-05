import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { type LinkProps, NavLink } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'red';
type AppLinkProps = {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
} & LinkProps;

export const AppLink: React.FC<AppLinkProps> = (props) => {
  const { to, className, children, activeClassName = '', variant = 'primary', ...otherProps } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])}
      {...otherProps}>
      {children}
    </NavLink>
  );
};
