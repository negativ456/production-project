import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { TestProps } from '@/shared/types/tests';
interface ArticleListProps extends TestProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = ({
  className,
  articles,
  view = ArticleView.TILE,
  isLoading,
  ...otherProps
}: ArticleListProps) => {
  return (
    <div {...otherProps} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length
        ? articles.map((article) => <ArticleListItem article={article} view={view} key={article.id} />)
        : null}
      {isLoading &&
        new Array(view === ArticleView.TILE ? 9 : 4)
          .fill(0)
          .map((item, idx) => <ArticleListItemSkeleton view={view} key={idx} />)}
    </div>
  );
};
