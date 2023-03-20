import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleCommentsSchema } from '../types/ArticleCommentsSchema'
import { CommentTypes } from 'entities/Comment'
import { StateSchema } from 'app/providers/StoreProvider'
import { fetchCommentsByID } from '../services/fetchCommentsByID/fetchCommentsByID'

const commentsAdapter = createEntityAdapter<CommentTypes>({
  selectId: (comment) => comment.id
})
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleComments ?? commentsAdapter.getInitialState()
)
export const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState: commentsAdapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    ids: [],
    entities: {}
  }),
  reducers: {
    addComment: (state, action: PayloadAction<CommentTypes>) => {
      commentsAdapter.setOne(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByID.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCommentsByID.fulfilled, (state, action: PayloadAction<CommentTypes[]>) => {
        state.isLoading = false
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCommentsByID.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articleCommentsActions } = articleCommentsSlice
export const { reducer: articleCommentsReducer } = articleCommentsSlice
