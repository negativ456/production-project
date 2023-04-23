import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Dropdown } from 'shared/ui/Popups'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isUserAdmin, isUserManager, userActions } from 'entities/User'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userData = useSelector(getUserAuthData)
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const isAdminAvailable = isAdmin || isManager
  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (!userData) {
    return null
  }
  return (
      <Dropdown
          className={classNames('', {}, [className])}
          direction={'bottom left'}
          items={[
            ...(isAdminAvailable ? [{ content: t('Админка'), href: RoutePath.admin_panel }] : []),
            { content: t('Профиль'), href: `${RoutePath.profile}${userData.id}` },
            { content: t('Выйти'), onClick: onLogout }
          ]}
          trigger={<Avatar size={40} src={userData.avatar}></Avatar>}
      />
  )
}
