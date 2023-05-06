import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from '@/features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { NotificationButton } from '@/features/NotificationButton'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { AppRoutes, routes } from '@/shared/const/router'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])
  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])
  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  if (userData) {
    return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Text className={cls.app_name} theme={TextTheme.INVERTED} title={t('Project title')}/>
        <HStack justify={'between'} max >
          <AppLink to={routes[AppRoutes.ARTICLE_CREATE]()}>{t('Создать статью')}</AppLink>
          <HStack gap={'16'}>
            <NotificationButton/>
            <AvatarDropdown/>
          </HStack>
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
