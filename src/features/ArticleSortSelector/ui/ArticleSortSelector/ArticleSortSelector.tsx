import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ArticleSortField } from '../../../../entities/Article/model/consts/articleConsts';
import { SortOrder } from '@/shared/types/SortOrder';

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
  const sortFieldOptions: Array<SelectOption<ArticleSortField>> = [
    {
      value: ArticleSortField.VIEWS,
      name: t('просмотрам'),
    },
    {
      value: ArticleSortField.CREATED,
      name: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      name: t('заголовку'),
    },
  ];
  const orderOptions: Array<SelectOption<SortOrder>> = [
    {
      value: 'asc',
      name: t('возрастанию'),
    },
    {
      value: 'desc',
      name: t('убыванию'),
    },
  ];
  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select options={sortFieldOptions} value={sort} onChange={onChangeSort} label={t('Сортировать по')} />
      <Select options={orderOptions} value={order} onChange={onChangeOrder} label={t('по')} />
    </div>
  );
};
