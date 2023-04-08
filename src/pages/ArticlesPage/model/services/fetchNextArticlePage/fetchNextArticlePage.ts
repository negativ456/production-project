import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import {
  getArticlesPageHasMore, getArticlesPageIsLoading,
  getArticlesPageQuantity
} from '../../selectors/articlesPageSelectors'
import { articlesListActions } from '../../slice/articlesListSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>('articles/fetchNextArticlePage',
  async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageQuantity(getState())
    const isLoading = getArticlesPageIsLoading(getState())
    if (hasMore && !isLoading) {
      dispatch(articlesListActions.setPage(page + 1))
      dispatch(fetchArticlesList({}))
    }
  })
