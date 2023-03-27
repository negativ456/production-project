import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { getArticlesPageMounted } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { articlesListActions } from '../../slice/articlesListSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>('articles/initArticlesPage',
  async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const mounted = getArticlesPageMounted(getState())
    if (!mounted) {
      dispatch(articlesListActions.initState())
      dispatch(fetchArticlesList({
        page: 1
      }))
    }
  })
