import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import React, { CSSProperties, useMemo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { Icon } from '../Icon/Icon';
import UserIcon from '@/shared/assets/icons/user.svg';
import { AppImage } from '../AppImage/AppImage';
interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, alt, className, size = 100, fallbackInverted } = props;
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border={'50%'} />;
  const errorFallback = <Icon inverted={fallbackInverted} Svg={UserIcon} width={size} height={size} />;
  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={style}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};
