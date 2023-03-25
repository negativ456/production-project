import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { ArticlesListSchema } from 'pages/ArticlesPage/model/types/ArticlesListSchema'
import { ArticleView } from 'entities/Article/model/types/article'
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList'
import { SELECTED_ARTICLE_VIEW } from 'shared/const/userKey'

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})
export const getArticlesList = articlesListAdapter.getSelectors<StateSchema>(
  (state) => state.articlesList ?? articlesListAdapter.getInitialState()
)
export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState: articlesListAdapter.getInitialState<ArticlesListSchema>({
    isLoading: false,
    error: '',
    view: ArticleView.TILE,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(SELECTED_ARTICLE_VIEW, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(SELECTED_ARTICLE_VIEW) as ArticleView
      state.view = view
      state.limit = view === ArticleView.TILE ? 9 : 4
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        articlesListAdapter.addMany(state, action.payload)
        state.hasMore = action.payload.length > 0
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articlesListActions } = articlesListSlice
export const { reducer: articlesListReducer } = articlesListSlice
