import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import React from 'react';
import { useSelector } from 'react-redux';
import { articlesListActions, getArticlesList } from '../../model/slice/articlesListSlice';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticleView,
} from '../../model/selectors/articlesPageSelectors';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/Text/Text';

interface ArticlesInfiniteListProps {
  className?: string;
}

export const ArticlesInfiniteList = ({ className }: ArticlesInfiniteListProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticlesList.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const [searchParams] = useSearchParams();
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticleView);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
    dispatch(articlesListActions.setStartView());
  });
  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />;
  }

  return (
    <ArticleList
      data-testid={'ArticleList'}
      className={className}
      articles={articles}
      isLoading={isLoading}
      view={view}
    />
  );
};
