import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'
import React from 'react'
interface LoaderProps {
  className?: string
}
export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
      <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
      </div>
  )
}
