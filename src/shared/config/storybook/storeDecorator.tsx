import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { Story } from '@storybook/react'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from '@/features/EditableProfileCard'
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
import { addNewCommentReducer } from '@/features/addNewComment/model/slice/addNewCommentSlice'
import { articleCommentsReducer } from '@/features/ArticleCommentList/model/slice/articleCommentsSlice'
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
