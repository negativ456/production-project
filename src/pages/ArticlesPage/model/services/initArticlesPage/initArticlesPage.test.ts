import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.TILE,
        mounted: false,
        search: '',
        sortOrder: 'asc',
        sort: ArticleSortField.VIEWS,
        type: ArticleType.ALL,
      },
    });

    await thunk.callThunk(new URLSearchParams());

    expect(thunk.dispatch).toBeCalledTimes(7);
    expect(fetchArticlesList).toHaveBeenCalledWith({});
  });
  test('initArticlesPage not called', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.LIST,
        mounted: true,
        search: '',
        sortOrder: 'asc',
        sort: ArticleSortField.VIEWS,
        type: ArticleType.ALL,
      },
    });

    await thunk.callThunk(new URLSearchParams());

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
