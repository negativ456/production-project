import cls from './ArticleRecommendations.module.scss'
import { ArticleList } from 'pages/ArticlesPage/ui/ArticleList/ArticleList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import {
  fetchArticleRecommendations
} from '../../model/services/fetchAricleRecommendations/fetchArticleRecommendations'
import {
  articleRecommendationsReducer,
  getArticleRecommendations
} from '../../model/slice/articleRecommendationSlice'
import { useSelector } from 'react-redux'
import { getArticleRecommendationLoading } from '../../selectors/recommendationsSelectors'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'

interface ArticleRecommendationsProps {
  className?: string
}
const reducers: ReducersList = {
  articleRecommendations: articleRecommendationsReducer
}

export const ArticleRecommendations = ({ className }: ArticleRecommendationsProps) => {
  const dispatch = useAppDispatch()
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const isLoading = useSelector(getArticleRecommendationLoading)

  useInitialEffect(() => {
    dispatch(fetchArticleRecommendations())
  })
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <ArticleList className={cls.recommendations} articles={recommendations} isLoading={isLoading}/>
      </DynamicModuleLoader>
  )
}
