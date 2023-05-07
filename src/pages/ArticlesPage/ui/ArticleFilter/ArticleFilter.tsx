import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleFilter.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  getArticleSearch,
  getArticleSort,
  getArticleSortOrder, getArticleType,
  getArticleView
} from '../../model/selectors/articlesPageSelectors'
import React, { useCallback } from 'react'
import { ArticleSortField, ArticleView, ArticleType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { articlesListActions } from '../../model/slice/articlesListSlice'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { SortOrder } from '@/shared/types/SortOrder'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { TabItem } from '@/shared/ui/Tabs/Tabs'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticlesTabFilter } from '@/features/ArticlesTabFilter'

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
  const type = useSelector(getArticleType)
  // const hasMore = useSelector(getArticlesPageHasMore)

  const fetchData = (): void => {
    dispatch(fetchArticlesList({ replace: true }))
  }
  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesListActions.setView(newView))
  }, [dispatch])
  const debouncedFetchData = useDebounce(fetchData, 500)
  const onChangeOrder = (newOrder: SortOrder): void => {
    dispatch(articlesListActions.setOrder(newOrder))
    dispatch(articlesListActions.setPage(1))
    fetchData()
  }
  const onChangeSort = (newSort: ArticleSortField): void => {
    dispatch(articlesListActions.setSort(newSort))
    dispatch(articlesListActions.setPage(1))
    fetchData()
  }
  const onChangeSearch = (value: string): void => {
    dispatch(articlesListActions.setSearch(value))
    dispatch(articlesListActions.setPage(1))
    debouncedFetchData()
  }

  const onChangeType = (tabItem: TabItem<ArticleType>) => {
    dispatch(articlesListActions.setType(tabItem.value as unknown as ArticleType))
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
        <ArticlesTabFilter value={type} onChangeTab={onChangeType}/>
      </div>
  )
}