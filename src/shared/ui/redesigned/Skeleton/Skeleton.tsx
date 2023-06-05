import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import React, { CSSProperties, memo } from 'react';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string | number;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
  const { className, width, height, border } = props;
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };
  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles}></div>;
});
