import { classNames } from 'shared/lib/classNames/classNames'
import React from 'react'
import { Modal } from 'shared/ui/Modal/Modal'
import { LoginForm } from '../LoginForm/LoginForm'
interface LoginModalProps {
  className?: string
  open: boolean
  onClose: () => void
}
export const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, open, onClose } = props
  return (
      <Modal open={open} onClose={onClose} className={classNames('', {}, [className])}>
        <LoginForm/>
      </Modal>
  )
}
