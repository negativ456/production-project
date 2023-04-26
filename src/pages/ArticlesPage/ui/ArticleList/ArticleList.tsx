import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article } from '@/entities/Article/model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleView } from '@/entities/Article'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

export const ArticleList = ({ className, articles, view = ArticleView.TILE, isLoading }: ArticleListProps) => {
  return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length
          ? articles.map((article) => <ArticleListItem article={article} view={view} key={article.id}/>)
          : null
        }
        {isLoading && new Array(view === ArticleView.TILE ? 9 : 4)
          .fill(0)
          .map((item, idx) => (<ArticleListItemSkeleton view={view} key={idx}/>))}
      </div>
  )
}
