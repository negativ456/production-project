import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'
import React from 'react'

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon = ({ className, Svg, inverted = false }: IconProps) => {
  return (
      <Svg className={classNames(cls.Icon, { [cls.inverted]: inverted }, [className])}/>
  )
}
