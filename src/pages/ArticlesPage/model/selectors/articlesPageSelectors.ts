import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article/model/types/article'

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesList?.isLoading ?? false
export const getArticlesPageError = (state: StateSchema) => state.articlesList?.error
export const getArticlesPageView = (state: StateSchema) => state.articlesList?.view ?? ArticleView.TILE
export const getArticlesPageQuantity = (state: StateSchema) => state.articlesList?.page ?? 1
export const getArticlesPageLimit = (state: StateSchema) => state.articlesList?.limit ?? 9
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesList?.hasMore
export const getArticlesPageMounted = (state: StateSchema) => state.articlesList?.mounted
