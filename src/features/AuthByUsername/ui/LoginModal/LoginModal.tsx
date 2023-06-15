import { classNames } from '@/shared/lib/classNames/classNames';
import React, { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
interface LoginModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}
export const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} className={classNames('', {}, [className])}>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
