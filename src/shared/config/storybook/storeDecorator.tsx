import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { Story } from '@storybook/react'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from '@/features/EditableProfileCard/testing'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addNewCommentReducer } from '@/features/addNewComment/testing'
import { articleCommentsReducer } from '@/features/ArticleCommentList/testing'
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleComments: articleCommentsReducer
}
export const storeDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
  (StoryComponent: Story) => {
    return (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent/>
      </StoreProvider>
    )
  }
