import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilter.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import React from 'react';
import { ArticlesTabFilter } from '@/features/ArticlesTabFilter';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/SortOrder';
import { TabItem } from '@/shared/ui/deprecated/Tabs/Tabs';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface ArticlesFilterProps {
  className?: string;
  onChangeSearch: (value: string) => void;
  search: string;
  type: ArticleType;
  onChangeType: (tabItem: TabItem<ArticleType>) => void;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticlesFilter = (props: ArticlesFilterProps) => {
  const { t } = useTranslation();
  const { className, onChangeSearch, search, onChangeSort, sort, onChangeOrder, order, type, onChangeType } = props;

  return (
    <Card padding={'24'} className={classNames(cls.ArticlesFilter, {}, [className])}>
      <VStack gap={'32'}>
        <Input
          addonLeft={<Icon Svg={SearchIcon} />}
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
          value={search}
        />
        <ArticlesTabFilter value={type} onChangeTab={onChangeType} />
        <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
      </VStack>
    </Card>
  );
};
