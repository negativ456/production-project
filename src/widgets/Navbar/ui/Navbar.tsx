import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface NavBarProps {
  className?: string
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.links}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={() => { setIsOpen(true) }}>{t('Войти')}</Button>
					{isOpen && <Modal open={isOpen} onClose={() => { setIsOpen(false) }}>
						{'Hello modal'}
					</Modal>}
				</div>
			</div>
  )
}
