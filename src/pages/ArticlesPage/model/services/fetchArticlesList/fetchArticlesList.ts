import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article, ArticleType } from '@/entities/Article'
import { getArticleSearch, getArticleSort, getArticleSortOrder, getArticleType, getArticlesPageLimit, getArticlesPageQuantity } from '../../selectors/articlesPageSelectors'
import { addQueryParams } from '@/shared/lib/addQueryParams/addQueryParams'

interface FetchArticlesListProps {
  replace?: boolean
}
export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>('articles/fetchArticlesList',
  async (props, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI
    const limit = getArticlesPageLimit(getState())
    const sort = getArticleSort(getState())
    const order = getArticleSortOrder(getState())
    const search = getArticleSearch(getState())
    const page = getArticlesPageQuantity(getState())
    const type = getArticleType(getState())
    try {
      addQueryParams({
        sort, order, search
      })
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
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
