import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleView } from 'entities/Article'

export interface ArticlesListSchema extends EntityState<Article>{
  view: ArticleView
  isLoading: boolean
  error?: string
  page: number
  limit?: number
  hasMore: boolean
  mounted: boolean
}
