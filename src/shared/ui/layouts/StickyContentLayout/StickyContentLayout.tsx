import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';
import { ReactElement } from 'react';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = ({ className, content, left, right }: StickyContentLayoutProps) => {
  return (
    <div className={classNames(cls.StickyContentLayout, {}, [className])}>
      {right && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {left && <div className={cls.right}>{right}</div>}
    </div>
  );
};
