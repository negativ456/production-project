import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
interface ModalProps {
  className?: string;
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
}
interface KeyboardEvent {
  key: string;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Modal: React.FC<ModalProps> = ({ className, onClose, children, open }) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        if (onClose) {
          onClose();
        }
      }
    },
    [onClose, open]
  );
  useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
  return (
    <Portal>
      <div className={classNames(cls.Modal, { [cls.opened]: open }, [className])}>
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
