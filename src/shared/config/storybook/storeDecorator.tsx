import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { Story } from '@storybook/react'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'features/EditableProfileCard'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer
}
export const storeDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
  (StoryComponent: Story) => {
    return (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent/>
      </StoreProvider>
    )
  }
