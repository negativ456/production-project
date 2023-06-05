import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack/HStack/HStack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popUpCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
  value: string;
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

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const { items = [], className, label, direction = 'bottom left', value, readonly, defaultValue, onChange } = props;

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value);
  }, [items, value]);

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
          <Button variant={'filled'} disabled={readonly}>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.option, {}, [mapDirectionClass[direction], popUpCls.menu])}>
          {items.map((item) => (
            <HListBox.Option key={item.value} value={item.value} as={Fragment} disabled={item.disabled}>
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popUpCls.active]: active,
                    [popUpCls.disabled]: item.disabled,
                    [popUpCls.selected]: selected,
                  })}>
                  {selected}
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
