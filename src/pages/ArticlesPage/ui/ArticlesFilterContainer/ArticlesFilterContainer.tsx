import { ArticlesFilter } from '@/widgets/ArticlesFilter';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ArticlesFilterContainerProps {
  className?: string;
}

export const ArticlesFilterContainer = ({ className }: ArticlesFilterContainerProps) => {
  const { order, onChangeOrder, onChangeSearch, search, onChangeSort, sort, onChangeType, type } = useArticlesFilter();
  return (
    <ArticlesFilter
      className={className}
      onChangeSearch={onChangeSearch}
      search={search}
      type={type}
      onChangeType={onChangeType}
      sort={sort}
      order={order}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
    />
  );
};
