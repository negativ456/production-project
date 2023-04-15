import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import cls from './ListBox.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from '../Button/Button'
import { HStack } from '../Stack/HStack/HStack'
import { DropdownDirection } from 'shared/types/ui'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  className?: string
  items?: ListBoxItem[]
  value?: string
  readonly?: boolean
  defaultValue?: string
  onChange: (value: string) => void
  direction?: DropdownDirection
  label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.bottom_left,
  'bottom right': cls.bottom_right,
  'top left': cls.top_left,
  'top right': cls.top_right
}

export function ListBox (props: ListBoxProps) {
  const { items = [], className, label, direction = 'bottom left', value, readonly, defaultValue, onChange } = props

  return (
      <HStack gap={'4'}>
        {label && <span>{label}</span>}
        <HListBox
            disabled={readonly}
            as={'div'}
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}>
          <HListBox.Button className={cls.trigger}>
            <Button disabled={readonly}>
              {value ?? defaultValue}
            </Button>
          </HListBox.Button>
          <HListBox.Options className={classNames(cls.option, {}, [mapDirectionClass[direction]])}>
            {items.map((item) => (
                <HListBox.Option
                    key={item.value}
                    value={item.value}
                    as={Fragment}
                    disabled={item.disabled}
                >
                  {({ active, selected }) => (
                      <li className={classNames(cls.item, { [cls.active]: active })}>
                        {selected && '!'}
                        {item.content}
                      </li>
                  )}
                </HListBox.Option>
            ))}
          </HListBox.Options>
        </HListBox>
      </HStack>

  )
}
