import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '../../../../entities/Article/model/consts/articleConsts';
import { SortOrder } from '@/shared/types/SortOrder';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBoxItem } from '@/shared/ui/redesigned/Popups/ui/ListBox/ListBox';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = ({
  className,
  sort,
  order,
  onChangeSort,
  onChangeOrder,
}: ArticleSortSelectorProps) => {
  const { t } = useTranslation();
  const sortFieldOptions: Array<ListBoxItem<ArticleSortField>> = [
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам'),
    },
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('заголовку'),
    },
  ];
  const orderOptions: Array<ListBoxItem<SortOrder>> = [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ];
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <VStack gap={'8'} className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
          <Text text={t('Сортировать по')} />
          <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
          <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
        </VStack>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <ListBoxDeprecated
            items={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
            label={t('Сортировать по')}
          />
          <ListBoxDeprecated items={orderOptions} value={order} onChange={onChangeOrder} label={t('по')} />
        </div>
      }
    />
  );
};
