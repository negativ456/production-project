import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticlesPageMounted } from '../../selectors/articlesPageSelectors'
import { articlesListActions } from '../../slice/articlesListSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { SortOrder } from '@/shared/types/SortOrder'
import { ArticleSortField } from '@/entities/Article'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>('articles/initArticlesPage',
  async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const mounted = getArticlesPageMounted(getState())
    if (!mounted) {
      dispatch(
        articlesListActions.setOrder(searchParams.get('order') as SortOrder ?? 'asc')
      )
      dispatch(
        articlesListActions.setSort(searchParams.get('sort') as ArticleSortField ?? ArticleSortField.VIEWS)
      )
      dispatch(
        articlesListActions.setSearch(searchParams.get('search') ?? '')
      )
      dispatch(articlesListActions.initState())
      dispatch(fetchArticlesList({}))
    }
  })
