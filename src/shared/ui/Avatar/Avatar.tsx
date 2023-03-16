import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import React, { CSSProperties, useMemo } from 'react'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}
export const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, alt, className, size = 100 } = props
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size
    }
  }, [size])
  return (
      <img
          src={src}
          alt={alt}
          style={style}
          className={classNames(cls.Avatar, {}, [className])}
      />
  )
}
