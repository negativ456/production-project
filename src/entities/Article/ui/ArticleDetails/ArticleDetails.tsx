import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { fetchArticleByID } from '../../model/services/fetchArticleByID/fetchArticleByID'
import { useSelector } from 'react-redux'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsLoading
} from '../../model/selectors/getArticleDetailsData'
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye.svg'
import CalendarIcon from 'shared/assets/icons/calendar.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleDetailsProps {
  className?: string
  id: string
}
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}
const renderBlock = (block: ArticleBlock): ReactNode | null => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent className={cls.block} block={block} key={block.id}/>
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent className={cls.block} block={block} key={block.id}/>
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent className={cls.block} block={block} key={block.id}/>
    default:
      return null
  }
}
export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ className, id }) => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsLoading)
  const article = useSelector(getArticleDetailsData)
  const error = useSelector(getArticleDetailsError)

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleByID(id))
    }
  }, [dispatch, id])
  let content
  if (isLoading) {
    content = <>
      <Skeleton className={cls.avatar} width={200} height={200} border="50%"/>
      <Skeleton className={cls.skeleton} width={300} height={32}/>
      <Skeleton className={cls.skeleton} width={600} height={24}/>
      <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
      <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
    </>
  } else if (error) {
    content = <Text theme={TextTheme.ERROR} title={'Произошла ошибка'} />
  } else {
    content = <>
      <div className={cls.avatar_wrapper}>
        <Avatar src={article?.img} size={200} className={cls.avatar}/>
      </div>
      <Text size={TextSize.L} title={article?.title} text={article?.subtitle}/>
      <div className={cls.article_info}>
        <Icon Svg={EyeIcon}/>
        <Text text={String(article?.views)}/>
      </div>
      <div className={cls.article_info}>
        <Icon Svg={CalendarIcon}/>
        <Text text={String(article?.createdAt)}/>
      </div>
      {article?.blocks.map(renderBlock)}
    </>
  }
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>

  )
}
