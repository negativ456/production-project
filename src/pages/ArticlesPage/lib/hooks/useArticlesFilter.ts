import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getArticleSearch,
  getArticleSort,
  getArticleSortOrder,
  getArticleType,
  getArticleView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import { useCallback } from 'react';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { SortOrder } from '@/shared/types/SortOrder';
import { TabItem } from '@/shared/ui/deprecated/Tabs/Tabs';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

export const useArticlesFilter = () => {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticleView);
  const sort = useSelector(getArticleSort);
  const order = useSelector(getArticleSortOrder);
  const search = useSelector(getArticleSearch);
  const type = useSelector(getArticleType);
  // const hasMore = useSelector(getArticlesPageHasMore)

  const fetchData = (): void => {
    dispatch(fetchArticlesList({ replace: true }));
  };
  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesListActions.setView(newView));
    },
    [dispatch]
  );
  const debouncedFetchData = useDebounce(fetchData, 500);
  const onChangeOrder = (newOrder: SortOrder): void => {
    dispatch(articlesListActions.setOrder(newOrder));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  };
  const onChangeSort = (newSort: ArticleSortField): void => {
    dispatch(articlesListActions.setSort(newSort));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  };
  const onChangeSearch = (value: string): void => {
    dispatch(articlesListActions.setSearch(value));
    dispatch(articlesListActions.setPage(1));
    debouncedFetchData();
  };

  const onChangeType = (tabItem: TabItem<ArticleType>) => {
    dispatch(articlesListActions.setType(tabItem.value as unknown as ArticleType));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  };

  return {
    view,
    sort,
    order,
    search,
    type,
    fetchData,
    onChangeView,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  };
};
