import cls from './ArticleRecommendations.module.scss'
import { ArticleList } from 'pages/ArticlesPage/ui/ArticleList/ArticleList'
import { useArticleRecommendations } from '../../api/articlesRecommendationsApi'

interface ArticleRecommendationsProps {
  className?: string
}

export const ArticleRecommendations = ({ className }: ArticleRecommendationsProps) => {
  const { isLoading, data: articles, error } = useArticleRecommendations(3)

  if (isLoading || error) {
    return null
  }
  return (
      <ArticleList className={cls.recommendations} articles={articles} isLoading={isLoading}/>
  )
}
