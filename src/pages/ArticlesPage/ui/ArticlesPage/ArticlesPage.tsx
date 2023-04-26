import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import React, { useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { articlesListReducer } from '../../model/slice/articlesListSlice'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page/ui/Page'
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage'
import { ArticleFilter, articleFilterReducer } from '@/features/ArticlesFilter'
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList'

interface ArticlesPageProps {
  className?: string
}
const reducers: ReducersList = {
  articlesList: articlesListReducer,
  articleFilter: articleFilterReducer
}
const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch()

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [])
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page onScrollCallback={onLoadNextPage} className={classNames(cls.ArticlesPage, {}, [className])}>
          <ArticleFilter/>
          <ArticlesInfiniteList/>
        </Page>
      </DynamicModuleLoader>
  )
}
export default ArticlesPage
