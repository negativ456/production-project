import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { userActions } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const userData = useSelector(getUserAuthData)
  const dispatch = useDispatch()
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
        <div className={cls.menu}>
          <AppLink to={RoutePath.article_create}>{t('Создать статью')}</AppLink>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>{t('Выйти')}</Button>
        </div>
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
