import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCommentList.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleCommentsReducer, getArticleComments } from '../../model/slice/articleCommentsSlice'
import { CommentList } from 'entities/Comment'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  getArticleCommentLoading
} from '../../model/selectors/commentsSelectors'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { fetchCommentsByID } from '../../model/services/fetchCommentsByID/fetchCommentsByID'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import { AddNewComment } from 'features/addNewComment/ui/AddNewComment/AddNewComment'

interface ArticleCommentListProps {
  className?: string
  articleID: string
}

const reducers: ReducersList = {
  articleComments: articleCommentsReducer
}
export const ArticleCommentList = ({ className, articleID }: ArticleCommentListProps) => {
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentLoading)
  // const error = useSelector(getArticleCommentError)
  const dispatch = useAppDispatch()
  useInitialEffect(() => {
    dispatch(fetchCommentsByID(articleID))
  })
  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [])
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ArticleCommentList, {}, [className])}>
          <AddNewComment onSendComment={onSendComment}/>
          <CommentList isLoading={isLoading} comments={comments}/>
        </div>
      </DynamicModuleLoader>

  )
}
