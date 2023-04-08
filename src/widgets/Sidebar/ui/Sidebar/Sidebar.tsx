import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useState } from 'react'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

interface SidebarProps {
  className?: string
}
export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const SidebarItemsList = useSelector(getSidebarItems)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  return (
		<menu data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.links}>
        {SidebarItemsList.map(item => (
            <SidebarItem item={item} collapsed={collapsed} key={item.path}/>
        ))}
      </div>
			<Button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          theme={ButtonTheme.BACKGROUND_INVERTED}
          size={ButtonSize.L}
          square
          className={cls.toggle}
      >
        {collapsed ? '>' : '<'}
      </Button>
			<div className={cls.switchers}>
				<ThemeSwitcher/>
				<LangSwitcher short={collapsed} className={cls.lang}/>
			</div>
		</menu>
  )
}
