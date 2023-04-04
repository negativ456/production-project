import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article/model/types/article'
import { SortOrder } from 'shared/types/SortOrder'

export interface ArticlesFilterSchema {
  view: ArticleView
  sortOrder: SortOrder
  sort: ArticleSortField
  type: ArticleType
  search: string
}
