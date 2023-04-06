import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { Article } from 'entities/Article'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>('articles/fetchArticlesList',
  async (props, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI
    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 4
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
