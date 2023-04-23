import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleFilter.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  getArticleSearch,
  getArticleSort,
  getArticleSortOrder,
  getArticleView
} from '../../model/selectors/articleFilterSelectors'
import React, { useCallback } from 'react'
import { ArticleSortField, ArticleView } from 'entities/Article'
import { articleFilterActions } from '../../model/slice/articleFilter'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector'
import { SortOrder } from 'shared/types/SortOrder'
import { articlesListActions, fetchArticlesList } from 'pages/ArticlesPage'
import { useDebounce } from 'shared/lib/hooks/useDebounce'
import { ArticlesTabFilter } from '../ArticlesTabFilter/ArticlesTabFilter'
import { TabItem } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article/model/consts/articleConsts'

interface ArticleFilterProps {
  className?: string
}

export const ArticleFilter = ({ className }: ArticleFilterProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const view = useSelector(getArticleView)
  const sort = useSelector(getArticleSort)
  const order = useSelector(getArticleSortOrder)
  const search = useSelector(getArticleSearch)
  // const hasMore = useSelector(getArticlesPageHasMore)

  const fetchData = (): void => {
    dispatch(fetchArticlesList({ replace: true }))
  }
  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articleFilterActions.setView(newView))
  }, [dispatch])
  const debouncedFetchData = useDebounce(fetchData, 500)
  const onChangeOrder = (newOrder: SortOrder): void => {
    dispatch(articleFilterActions.setOrder(newOrder))
    dispatch(articlesListActions.setPage(1))
    fetchData()
  }
  const onChangeSort = (newSort: ArticleSortField): void => {
    dispatch(articleFilterActions.setSort(newSort))
    dispatch(articlesListActions.setPage(1))
    fetchData()
  }
  const onChangeSearch = (value: string): void => {
    dispatch(articleFilterActions.setSearch(value))
    dispatch(articlesListActions.setPage(1))
    debouncedFetchData()
  }

  const onChangeType = (tabItem: TabItem<ArticleType>) => {
    dispatch(articleFilterActions.setType(tabItem.value as unknown as ArticleType))
    dispatch(articlesListActions.setPage(1))
    fetchData()
  }
  return (
      <div className={classNames(cls.ArticleFilter, {}, [className])}>
        <div className={cls.sort_wrapper}>
          <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort}/>
          <ArticleViewSwitcher view={view} onViewClick={onChangeView}/>
        </div>
        <Card className={cls.search}>
          <Input onChange={onChangeSearch} placeholder={t('Поиск по статьям')} value={search}/>
        </Card>
        <ArticlesTabFilter onChangeTab={onChangeType}/>
      </div>
  )
}
