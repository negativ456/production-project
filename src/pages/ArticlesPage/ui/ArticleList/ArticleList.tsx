import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from 'entities/Article/model/types/article'
import { ArticleListItem } from 'pages/ArticlesPage/ui/ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from 'pages/ArticlesPage/ui/ArticleListItem/ArticleListItemSkeleton'

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
