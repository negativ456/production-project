import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { userActions } from 'entities/User'

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
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>{t('Выйти')}</Button>
      </div>
    </div>
    )
  }
  return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.links}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={openModal}>{t('Войти')}</Button>
					{isOpen && <LoginModal open={isOpen} onClose={closeModal}/>}
				</div>
			</div>
  )
}
