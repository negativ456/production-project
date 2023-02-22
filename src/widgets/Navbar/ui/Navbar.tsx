import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])
  return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.links}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={() => { setIsOpen(true) }}>{t('Войти')}</Button>
					{isOpen && <LoginModal open={isOpen} onClose={closeModal}/>}
				</div>
			</div>
  )
}
