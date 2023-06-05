import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { Popover as PopoverDerprecated } from '@/shared/ui/deprecated/Popups';
import { Button as ButtonDerprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDerprecated } from '@/shared/ui/deprecated/Icon/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notifications.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { useState } from 'react';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { isMobile } from '@/shared/lib/detectDevice/detectDevice';
import { AnimationProvider } from '@/shared/lib/AnimationProvider';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = () => {
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };
  const trigger = (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />}
      off={
        <ButtonDerprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDerprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDerprecated>
      }
    />
  );

  return (
    <div>
      {isMobile() ? (
        <>
          {trigger}
          <AnimationProvider>
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
          </AnimationProvider>
        </>
      ) : (
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={
            <Popover className={classNames('', {}, [className])} direction={'bottom left'} trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDerprecated className={classNames('', {}, [className])} direction={'bottom left'} trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </PopoverDerprecated>
          }
        />
      )}
    </div>
  );
};
