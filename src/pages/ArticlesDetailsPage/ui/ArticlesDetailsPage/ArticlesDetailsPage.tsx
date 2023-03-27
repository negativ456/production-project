import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { ArticleCommentList } from 'features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList'
import { Page } from 'shared/ui/Page/Page'

interface ArticlesDetailsPageProps {
  className?: string
}

const ArticlesDetailsPage: React.FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams()

  if (!id) {
    return (
        <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
          {t('Статья не найдена')}
        </Page>
    )
  }
  return (
      <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
        <ArticleDetails id={id}/>
        <Text title={t('Комментарии')} className={cls.comment_title}/>
        <ArticleCommentList articleID={id}/>
      </Page>
  )
}
export default ArticlesDetailsPage