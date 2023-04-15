import { Menu } from '@headlessui/react'
import cls from './Dropdown.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Fragment, ReactNode } from 'react'
import { AppLink } from '../AppLink/AppLink'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}
interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: 'left' | 'right'

}
export function Dropdown (props: DropdownProps) {
  const { className, items, trigger, direction = 'left' } = props
  return (
      <Menu as={'div'} className={classNames(cls.Dropdown, {}, [className, cls[direction]])}>
        <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
        <Menu.Items className={cls.menu}>
          {items.map((item, idx) => {
            const content = ({ active }: { active: boolean }) => (
              <button
                  type={'button'}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={classNames(cls.item, { [cls.active]: active })}
              >
                {item.content}
              </button>
            )
            if (item.href) {
              return (
                  <Menu.Item key={idx} to={item.href} as={AppLink} disabled={item.disabled}>
                    {content}
                  </Menu.Item>
              )
            }
            return (
                <Menu.Item key={idx} as={Fragment} disabled={item.disabled}>
                  {content}
                </Menu.Item>
            )
          })}

        </Menu.Items>
      </Menu>
  )
}
