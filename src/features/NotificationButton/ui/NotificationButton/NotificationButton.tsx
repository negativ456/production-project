import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/notifications.svg';
import { NotificationList } from '@/entities/Notification';
import { useState } from 'react';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { isMobile } from '@/shared/lib/detectDevice/detectDevice';
import { AnimationProvider } from '@/shared/lib/AnimationProvider';

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
    <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
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
        <Popover className={classNames('', {}, [className])} direction={'bottom left'} trigger={trigger}>
          <NotificationList className={cls.notifications} />
        </Popover>
      )}
    </div>
  );
};
