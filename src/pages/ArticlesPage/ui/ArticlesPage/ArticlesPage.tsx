import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import React from 'react'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  return (
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        ArticlesPage
      </div>
  )
}
export default ArticlesPage
