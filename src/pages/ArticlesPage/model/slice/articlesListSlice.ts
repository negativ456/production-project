import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { ArticlesListSchema } from '../types/ArticlesListSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { SELECTED_ARTICLE_VIEW } from '@/shared/const/localstorageKeys';
import { SortOrder } from '@/shared/types/SortOrder';

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});
export const getArticlesList = articlesListAdapter.getSelectors<StateSchema>(
  (state) => state.articlesList ?? articlesListAdapter.getInitialState()
);
export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState: articlesListAdapter.getInitialState<ArticlesListSchema>({
    isLoading: false,
    error: '',
    view: ArticleView.TILE,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    mounted: false,
    search: '',
    sortOrder: 'asc',
    sort: ArticleSortField.VIEWS,
    type: ArticleType.ALL,
  }),
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = (localStorage.getItem(SELECTED_ARTICLE_VIEW) as ArticleView) ?? ArticleView.TILE;
      state.limit = view === ArticleView.TILE ? 9 : 4;
      state.mounted = true;
    },
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(SELECTED_ARTICLE_VIEW, action.payload);
    },
    setStartView: (state) => {
      const view = localStorage.getItem(SELECTED_ARTICLE_VIEW) as ArticleView;
      state.view = view;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        if (action.meta.arg.replace) {
          articlesListAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
        if (action.meta.arg.replace) {
          articlesListAdapter.setAll(state, action.payload);
        } else {
          articlesListAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articlesListActions } = articlesListSlice;
export const { reducer: articlesListReducer } = articlesListSlice;
