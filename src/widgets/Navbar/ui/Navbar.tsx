import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { isUserAdmin, isUserManager, userActions } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { HStack } from 'shared/ui/Stack'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const userData = useSelector(getUserAuthData)
  const dispatch = useDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const isAdminAvailable = isAdmin || isManager
  const { t } = useTranslation()
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])
  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])
  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])
  if (userData) {
    return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Text className={cls.app_name} theme={TextTheme.INVERTED} title={t('Project title')}/>
        <HStack justify={'between'} max >
          <AppLink to={RoutePath.article_create}>{t('Создать статью')}</AppLink>
          <Dropdown
              direction={'right'}
              items={[
                ...(isAdminAvailable ? [{ content: t('Админка'), href: RoutePath.admin_panel }] : []),
                { content: t('Профиль'), href: `${RoutePath.profile}${userData.id}` },
                { content: t('Выйти'), onClick: onLogout }
              ]}
              trigger={<Avatar size={40} src={userData.avatar}></Avatar>}
          />
        </HStack>
      </div>
    </header>
    )
  }
  return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.links}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={openModal}>{t('Войти')}</Button>
					{isOpen && <LoginModal open={isOpen} onClose={closeModal}/>}
				</div>
			</header>
  )
}
