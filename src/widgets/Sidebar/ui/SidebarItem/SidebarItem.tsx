import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebarTypes';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <AppLink
          activeClassName={cls.active}
          variant={'primary'}
          to={item.path}
          className={classNames(cls.SidebarItemRedesigned, { [cls.collapsedRedesigned]: collapsed }, [])}>
          <Icon Svg={item.Icon} />
          <span>{t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.INVERTED_PRIMARY}
          to={item.path}
          className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [])}>
          <item.Icon className={cls.icon} />
          <span>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
