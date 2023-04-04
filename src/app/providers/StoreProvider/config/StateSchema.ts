import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ProfileSchema } from 'features/EditableProfileCard'
import { ArticleDetailsSchema } from 'entities/Article'
import { ArticleCommentsSchema } from 'features/ArticleCommentList'
import { AddNewCommentSchema } from 'features/addNewComment'
import { ArticlesListSchema } from 'pages/ArticlesPage'
import { ScrollSaveSchema } from 'widgets/Page'
import { ArticlesFilterSchema } from 'features/ArticlesFilter/model/types/ArticlesFilterSchema'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  scroll: ScrollSaveSchema
  loginForm?: LoginSchema
  articleFilter?: ArticlesFilterSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleComments?: ArticleCommentsSchema
  addNewComment?: AddNewCommentSchema
  articlesList?: ArticlesListSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
  reducerManager: ReducerManager
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ThunkExtraArgs {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgs
  state: StateSchema
}
