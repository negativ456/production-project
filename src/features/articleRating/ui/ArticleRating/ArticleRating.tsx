import { useTranslation } from 'react-i18next'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })
  const [rateArticleMutation] = useRateArticle()

  const onAccept = (stars: number, feedback?: string) => {
    handleRateArticle(stars, feedback)
  }
  const onCancel = (stars: number) => {
    handleRateArticle(stars)
  }

  const handleRateArticle = (stars: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId: userData?.id ?? '',
        articleId,
        feedback,
        rate: stars
      })
    } catch (e) {
      console.log(e)
    }
  }
  const rating = data?.[0]?.rate

  if (isLoading) {
    return <Skeleton width={'100%'} height={120}/>
  }
  return (
      <RatingCard
          rate={rating}
          onAccept={onAccept}
          onCancel={onCancel}
          title={t('Оцените статью')}
          feedbackTitle={t('Оставьте отзыв о статье')}
          hasFeedback
          className={className}
      />
  )
}

export default ArticleRating
