import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import {
  fetchArticleRecommendations
} from '../services/fetchAricleRecommendations/fetchArticleRecommendations'
import { ArticleRecommendationsSchema } from '../types/articleRecommendationsTypes'

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})
export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleRecommendations ?? recommendationsAdapter.getInitialState()
)
export const articleRecommendationsSlice = createSlice({
  name: 'articleRecommendations',
  initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
    isLoading: false,
    ids: [],
    entities: {}
  }),
  reducers: {
    setRecommendations: (state, action: PayloadAction<Article[]>) => {
      recommendationsAdapter.setAll(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articleRecommendationsActions } = articleRecommendationsSlice
export const { reducer: articleRecommendationsReducer } = articleRecommendationsSlice
