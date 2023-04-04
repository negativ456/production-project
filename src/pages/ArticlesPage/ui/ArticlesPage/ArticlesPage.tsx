import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import React, { useCallback } from 'react'
import { ArticleList } from '../ArticleList/ArticleList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useSelector } from 'react-redux'
import { articlesListReducer, getArticlesList } from 'pages/ArticlesPage/model/slice/articlesListSlice'
import { getArticlesPageIsLoading } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from 'widgets/Page/ui/Page'
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/services/fetchNextArticlePage/fetchNextArticlePage'
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage'
import { ArticleFilter, articleFilterActions, articleFilterReducer, getArticleView } from 'features/ArticlesFilter'
import { useSearchParams } from 'react-router-dom'

interface ArticlesPageProps {
  className?: string
}
const reducers: ReducersList = {
  articlesList: articlesListReducer,
  articleFilter: articleFilterReducer
}
const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticlesList.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const [searchParams] = useSearchParams()
  // const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticleView)
  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
    dispatch(articleFilterActions.setStartView())
  })

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [])
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page onScrollCallback={onLoadNextPage} className={classNames(cls.ArticlesPage, {}, [className])}>
          <ArticleFilter/>
          <ArticleList articles={articles} isLoading={isLoading} view={view}/>
        </Page>
      </DynamicModuleLoader>
  )
}
export default ArticlesPage
