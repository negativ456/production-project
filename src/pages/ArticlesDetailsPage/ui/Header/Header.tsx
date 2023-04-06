import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Header.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from 'entities/Article/model/selectors/article'
import { useNavigate } from 'react-router-dom'
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const { t } = useTranslation()
  const canEdit = useSelector(getCanEditArticle)
  const navigate = useNavigate()
  const article = useSelector(getArticleDetailsData)
  const onEditArticle = () => {
    if (article) navigate(`${RoutePath.articles}/${article?.id}/edit`)
  }
  return (
      <div className={classNames(cls.Header, {}, [className])}>
        {canEdit && <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>{t('Редактировать')}</Button>}
      </div>
  )
}
