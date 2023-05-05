import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesList?.isLoading ?? false
export const getArticlesPageError = (state: StateSchema) => state.articlesList?.error
export const getArticlesPageQuantity = (state: StateSchema) => state.articlesList?.page ?? 1
export const getArticlesPageLimit = (state: StateSchema) => state.articlesList?.limit ?? 9
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesList?.hasMore
export const getArticlesPageMounted = (state: StateSchema) => state.articlesList?.mounted
export const getArticleView = (state: StateSchema) => state.articlesList?.view ?? ArticleView.TILE
export const getArticleSortOrder = (state: StateSchema) => state.articlesList?.sortOrder ?? 'asc'
export const getArticleSort = (state: StateSchema) => state.articlesList?.sort ?? ArticleSortField.VIEWS
export const getArticleSearch = (state: StateSchema) => state.articlesList?.search ?? ''
export const getArticleType = (state: StateSchema) => state.articlesList?.type ?? ArticleType.ALL
