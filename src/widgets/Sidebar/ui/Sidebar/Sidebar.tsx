import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useState } from 'react';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/shared/ui/deprecated/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-down.svg';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface SidebarProps {
  className?: string;
}
export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const SidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <aside
          data-testid="sidebar"
          className={classNames(cls.SidebarRedesigned, { [cls.collapsedRedesigned]: collapsed }, [className])}>
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role={'navigation'} gap={'16'} className={cls.links}>
            {SidebarItemsList.map((item) => (
              <SidebarItem item={item} collapsed={collapsed} key={item.path} />
            ))}
          </VStack>
          <Icon Svg={ArrowIcon} onClick={onToggle} clickable className={cls.toggle} />
          <HStack gap={'16'} justify={'center'} className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </HStack>
        </aside>
      }
      off={
        <aside data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
          <VStack role={'navigation'} gap={'8'} className={cls.links}>
            {SidebarItemsList.map((item) => (
              <SidebarItem item={item} collapsed={collapsed} key={item.path} />
            ))}
          </VStack>
          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
            className={cls.toggle}>
            {collapsed ? '>' : '<'}
          </Button>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
};
