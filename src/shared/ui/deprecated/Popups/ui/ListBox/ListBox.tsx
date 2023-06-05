import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../../deprecated/Button/Button';
import { HStack } from '../../../../redesigned/Stack/HStack/HStack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popUpCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: Array<ListBoxItem<T>>;
  value?: T;
  readonly?: boolean;
  defaultValue?: string;
  onChange: (value: T) => void;
  direction?: DropdownDirection;
  label?: string;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const { items = [], className, label, direction = 'bottom left', value, readonly, defaultValue, onChange } = props;

  return (
    <HStack gap={'4'}>
      {label && <span>{label}</span>}
      <HListBox
        disabled={readonly}
        as={'div'}
        className={classNames('', {}, [className, popUpCls.popup])}
        value={value}
        onChange={onChange}>
        <HListBox.Button className={popUpCls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.option, {}, [mapDirectionClass[direction]])}>
          {items.map((item) => (
            <HListBox.Option key={item.value} value={item.value} as={Fragment} disabled={item.disabled}>
              {({ active, selected }) => (
                <li className={classNames(cls.item, { [popUpCls.active]: active, [popUpCls.disabled]: item.disabled })}>
                  {selected && '!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
