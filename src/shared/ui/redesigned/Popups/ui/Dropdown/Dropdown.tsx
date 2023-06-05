import { Menu } from '@headlessui/react';
import cls from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { AppLink } from '../../../../deprecated/AppLink/AppLink';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popUpCls from '../../styles/popup.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}
interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom left' } = props;
  return (
    <Menu as={'div'} className={classNames('', {}, [className, popUpCls.popup])}>
      <Menu.Button className={popUpCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction], popUpCls.menu])}>
        {items.map((item, idx) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type={'button'}
              onClick={item.onClick}
              disabled={item.disabled}
              className={classNames(cls.item, { [popUpCls.active]: active })}>
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item key={idx} to={item.href} as={AppLink} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={idx} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
