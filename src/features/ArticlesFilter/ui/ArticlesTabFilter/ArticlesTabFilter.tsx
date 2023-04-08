import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesTabFilter.module.scss'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo } from 'react'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article/model/types/article'
import { useSelector } from 'react-redux'
import { getArticleType } from '../../model/selectors/articleFilterSelectors'

interface ArticlesTabFilterProps {
  className?: string
  onChangeTab: (type: TabItem<ArticleType>) => void
}

export const ArticlesTabFilter = ({ className, onChangeTab }: ArticlesTabFilterProps) => {
  const { t } = useTranslation()
  const type = useSelector(getArticleType)

  const tabList = useMemo<Array<TabItem<ArticleType>>>(() => [
    {
      value: ArticleType.ALL,
      content: t('Все статьи')
    },
    {
      value: ArticleType.IT,
      content: t('Айти')
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Экономика')
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Наука')
    }
  ], [t])
  useEffect(() => {
    console.log(type)
  }, [type])
  return (
      <Tabs value={type} onTabClick={onChangeTab} tabs={tabList} className={classNames(cls.ArticlesTabFilter, {}, [className])}/>
  )
}
