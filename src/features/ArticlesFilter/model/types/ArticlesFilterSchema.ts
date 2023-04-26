import { SortOrder } from '@/shared/types/SortOrder'
import { ArticleSortField, ArticleView } from '@/entities/Article'
import { ArticleType } from '@/entities/Article/model/consts/articleConsts'

export interface ArticlesFilterSchema {
  view: ArticleView
  sortOrder: SortOrder
  sort: ArticleSortField
  type: ArticleType
  search: string
}
