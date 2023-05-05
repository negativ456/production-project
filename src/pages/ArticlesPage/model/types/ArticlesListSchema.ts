import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { SortOrder } from '@/shared/types/SortOrder'

export interface ArticlesListSchema extends EntityState<Article>{
  view: ArticleView
  isLoading: boolean
  error?: string
  page: number
  limit?: number
  hasMore: boolean
  mounted: boolean
  sortOrder: SortOrder
  sort: ArticleSortField
  type: ArticleType
  search: string
}
