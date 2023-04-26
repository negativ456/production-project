import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticlesFilterSchema } from '../types/ArticlesFilterSchema'
import { SortOrder } from '@/shared/types/SortOrder'
import { ArticleSortField, ArticleView } from '@/entities/Article'
import { SELECTED_ARTICLE_VIEW } from '@/shared/const/userKey'

import { ArticleType } from '@/entities/Article/model/consts/articleConsts'

const initialState: ArticlesFilterSchema = {
  view: ArticleView.TILE,
  search: '',
  sortOrder: 'asc',
  sort: ArticleSortField.VIEWS,
  type: ArticleType.ALL
}

export const articleFilter = createSlice({
  name: 'articleFilter',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(SELECTED_ARTICLE_VIEW, action.payload)
    },
    setStartView: (state) => {
      const view = localStorage.getItem(SELECTED_ARTICLE_VIEW) as ArticleView
      state.view = view
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload
    }
  }

})

export const { actions: articleFilterActions } = articleFilter
export const { reducer: articleFilterReducer } = articleFilter
