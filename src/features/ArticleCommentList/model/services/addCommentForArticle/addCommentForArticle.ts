import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { CommentTypes } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'
import { articleCommentsActions } from '../../slice/articleCommentsSlice'

export const addCommentForArticle = createAsyncThunk<CommentTypes, string, ThunkConfig<string>>('comment/addCommentForArticle',
  async (text, thunkAPI) => {
    const { rejectWithValue, extra, getState, dispatch } = thunkAPI
    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())
    if (!userData || !text || !article) {
      return rejectWithValue('no data')
    }
    try {
      const response = await extra.api.post<CommentTypes>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text
      })

      if (!response.data) {
        throw new Error()
      }
      const newComment: CommentTypes = {
        id: response.data.id,
        user: userData,
        text: response.data.text
      }
      dispatch(articleCommentsActions.addComment(newComment))
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  })
