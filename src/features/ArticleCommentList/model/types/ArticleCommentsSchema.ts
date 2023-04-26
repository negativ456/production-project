import { CommentTypes } from '@/entities/Comment'
import { EntityState } from '@reduxjs/toolkit'

export interface ArticleCommentsSchema extends EntityState<CommentTypes>{
  isLoading?: boolean
  error?: string
}
