import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import React, { useCallback } from 'react'
import { ArticleList } from '../ArticleList/ArticleList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useSelector } from 'react-redux'
import {
  articlesListActions,
  articlesListReducer,
  getArticlesList
} from 'pages/ArticlesPage/model/slice/articlesListSlice'
import {
  getArticlesPageIsLoading,
  getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher'
import { ArticleView } from 'entities/Article/model/types/article'
import { Page } from 'shared/ui/Page/Page'
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/services/fetchNextArticlePage/fetchNextArticlePage'
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage'

interface ArticlesPageProps {
  className?: string
}
const reducers: ReducersList = {
  articlesList: articlesListReducer
}
const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticlesList.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  // const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)
  useInitialEffect(() => {
    dispatch(initArticlesPage())
  })
  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesListActions.setView(newView))
  }, [dispatch, view])

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [])
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page onScrollCallback={onLoadNextPage} className={classNames(cls.ArticlesPage, {}, [className])}>
          <ArticleViewSwitcher view={view} onViewClick={onChangeView}/>
          <ArticleList articles={articles} isLoading={isLoading} view={view}/>
        </Page>
      </DynamicModuleLoader>
  )
}
export default ArticlesPage
