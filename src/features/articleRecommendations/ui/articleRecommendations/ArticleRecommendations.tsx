import cls from './ArticleRecommendations.module.scss'
import { useArticleRecommendations } from '../../api/articlesRecommendationsApi'
import { ArticleList } from '@/entities/Article'

interface ArticleRecommendationsProps {
  className?: string
}

export const ArticleRecommendations = ({ className }: ArticleRecommendationsProps) => {
  const { isLoading, data: articles, error } = useArticleRecommendations(3)

  if ((isLoading || error) ?? !articles) {
    return null
  }
  return (
      <ArticleList className={cls.recommendations} articles={articles} isLoading={isLoading}/>
  )
}
