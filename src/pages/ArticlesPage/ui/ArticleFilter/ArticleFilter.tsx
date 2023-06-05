import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleFilter.module.scss';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticlesTabFilter } from '@/features/ArticlesTabFilter';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ArticleFilterProps {
  className?: string;
}

export const ArticleFilter = ({ className }: ArticleFilterProps) => {
  const { t } = useTranslation();
  const { search, sort, onChangeSearch, onChangeSort, onChangeType, type, onChangeView, view, onChangeOrder, order } =
    useArticlesFilter();
  return (
    <div className={classNames(cls.ArticleFilter, {}, [className])}>
      <div className={cls.sort_wrapper}>
        <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input onChange={onChangeSearch} placeholder={t('Поиск по статьям')} value={search} />
      </Card>
      <ArticlesTabFilter value={type} onChangeTab={onChangeType} />
    </div>
  );
};
