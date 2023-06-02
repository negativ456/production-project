import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { ReactNode } from 'react';
import { mapDirectionClass } from '../../styles/consts';
import popUpCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export function Popover(props: PopoverProps) {
  const { className, direction = 'bottom right', trigger, children } = props;

  return (
    <HPopover className={classNames('', {}, [className, popUpCls.popup])}>
      <HPopover.Button as={'div'} className={popUpCls.trigger}>
        {trigger}
      </HPopover.Button>
      <HPopover.Panel className={classNames(cls.panel, {}, [mapDirectionClass[direction]])}>{children}</HPopover.Panel>
    </HPopover>
  );
}
