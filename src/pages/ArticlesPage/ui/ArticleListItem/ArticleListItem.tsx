import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { useTranslation } from 'react-i18next'
import { Article, ArticleTextBlockComponent, ArticleView } from 'entities/Article'
import { ArticleTextBlock } from 'entities/Article/model/types/article'
import { Text } from 'shared/ui/Text/Text'
import EyeIcon from 'shared/assets/icons/eye.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import { ArticleBlockType } from 'entities/Article/model/consts/articleConsts'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleListItem = ({ className, article, view }: ArticleListItemProps) => {
  const { t } = useTranslation()
  const types = <Text text={article.type.join(', ')} className={cls.types}/>
  const viewBlock = <div className={cls.view}>
    <Text text={String(article.views)}/>
    <Icon Svg={EyeIcon}/>
  </div>
  const textBlock = article.blocks.find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
  if (view === ArticleView.LIST) {
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          <Card>
            <div className={cls.top}>
              <div className={cls.user}>
                <Avatar src={article.user.avatar} size={40}/>
                <Text text={article.user.username}/>
              </div>
              <Text text={article.createdAt} className={cls.date}/>
            </div>
            <Text title={article.title} className={cls.title}/>
            {types}
            <img src={article.img} alt={article.title} className={cls.image}/>
            {textBlock && <ArticleTextBlockComponent className={cls.text_block} block={textBlock}/>}
            <div className={cls.bottom}>
              <AppLink theme={AppLinkTheme.NO_UNDERLINE} to={article.id}>
                <Button theme={ButtonTheme.OUTLINE}>
                  {t('Читать далее')}
                </Button>
              </AppLink>
              {viewBlock}
            </div>
          </Card>
        </div>
    )
  }
  return (
      <AppLink
          theme={AppLinkTheme.NO_UNDERLINE}
          className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
          to={`${RoutePath.articles_details}${article.id}`}>
        <Card>
          <div className={cls.article_top}>
            <img src={article.img} alt={article.subtitle} className={cls.image}/>
            <Text text={article.createdAt} className={cls.date}/>
          </div>
          <div className={cls.article_bottom}>
            <div className={cls.info}>
              {types}
              {viewBlock}
            </div>
            <Text className={cls.title} text={article.title}/>
          </div>
        </Card>
      </AppLink>
  )
}
