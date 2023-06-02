import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';
import React from 'react';
interface LoaderProps {
  className?: string;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames('lds-ellipsis', {}, [className])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
