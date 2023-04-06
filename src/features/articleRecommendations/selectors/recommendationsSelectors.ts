import { StateSchema } from 'app/providers/StoreProvider'

export const getArticleRecommendationLoading = (state: StateSchema) => state.articleRecommendations?.isLoading
