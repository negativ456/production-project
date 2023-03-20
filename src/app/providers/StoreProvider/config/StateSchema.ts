import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { To } from 'history'
import { NavigateOptions } from 'react-router'
import { ProfileSchema } from 'features/EditableProfileCard'
import { ArticleDetailsSchema } from 'entities/Article'
import { ArticleCommentsSchema } from 'features/ArticleCommentList'
import { AddNewCommentSchema } from 'features/addNewComment'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleComments?: ArticleCommentsSchema
  addNewComment?: AddNewCommentSchema
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
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgs
  state: StateSchema
}
