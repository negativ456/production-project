import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import React, { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesListReducer } from '../../model/slice/articlesListSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { ArticleFilter } from '../ArticleFilter/ArticleFilter';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/ui/layouts/StickyContentLayout/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesFilterContainer } from '../ArticlesFilterContainer/ArticlesFilterContainer';

interface ArticlesPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articlesList: articlesListReducer,
};
const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, []);
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <StickyContentLayout
            left={<ViewSelectorContainer />}
            content={
              <Page
                data-testid={'ArticlesPage'}
                onScrollCallback={onLoadNextPage}
                className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticlesInfiniteList />
                <ArticlePageGreeting />
              </Page>
            }
            right={<ArticlesFilterContainer />}
          />
        }
        off={
          <Page
            data-testid={'ArticlesPage'}
            onScrollCallback={onLoadNextPage}
            className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleFilter />
            <ArticlesInfiniteList />
            <ArticlePageGreeting />
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};
export default ArticlesPage;
