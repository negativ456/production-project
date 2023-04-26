import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleView } from '@/entities/Article'

import { ArticleType } from '@/entities/Article/model/consts/articleConsts'

export const getArticleView = (state: StateSchema) => state.articleFilter?.view ?? ArticleView.TILE
export const getArticleSortOrder = (state: StateSchema) => state.articleFilter?.sortOrder ?? 'asc'
export const getArticleSort = (state: StateSchema) => state.articleFilter?.sort ?? ArticleSortField.VIEWS
export const getArticleSearch = (state: StateSchema) => state.articleFilter?.search ?? ''
export const getArticleType = (state: StateSchema) => state.articleFilter?.type ?? ArticleType.ALL
