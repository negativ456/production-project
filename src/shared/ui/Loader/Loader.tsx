import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Loader.module.scss'
import React from 'react'
import LoaderIcon from 'shared/assets/icons/loader.svg'
interface LoaderProps {
  className?: string
}
export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
      <div className={classNames(cls.Loader, {}, [className])}>
        <LoaderIcon/>
      </div>
  )
}
