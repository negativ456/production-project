import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { CommentTypes } from '@/entities/Comment'

export const fetchCommentsByID = createAsyncThunk<CommentTypes[], string | undefined, ThunkConfig<string>>('comment/fetchCommentsByID',
  async (articleId, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI
    if (!articleId) {
      return rejectWithValue('error')
    }
    try {
      const response = await extra.api.get<CommentTypes[]>('/comments', {
        params: {
          articleId,
          _expand: 'user'
        }
      })

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  })
