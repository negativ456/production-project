import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';

import { AppRoutes, routes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminAvailable = isAdmin || isManager;
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!userData) {
    return null;
  }

  const items = [
    ...(isAdminAvailable ? [{ content: t('Админка'), href: routes[AppRoutes.ADMIN_PANEL]() }] : []),
    { content: t('Профиль'), href: routes[AppRoutes.PROFILE](userData.id) },
    { content: t('Настройки'), href: routes[AppRoutes.SETTINGS]() },
    { content: t('Выйти'), onClick: onLogout },
  ];
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          direction={'bottom left'}
          items={items}
          trigger={<Avatar size={40} src={userData.avatar}></Avatar>}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          direction={'bottom left'}
          items={items}
          trigger={<AvatarDeprecated size={40} src={userData.avatar}></AvatarDeprecated>}
        />
      }
    />
  );
};
