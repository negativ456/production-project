import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebarTypes'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()
  const isAuth = useSelector(getUserAuthData)
  if (item.authOnly && !isAuth) {
    return null
  }
  return (
      <AppLink
          theme={AppLinkTheme.INVERTED_PRIMARY}
          to={item.path}
          className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [])}>
        <item.Icon className={cls.icon}/>
        <span>
          { t(item.text) }
        </span>
      </AppLink>
  )
})
