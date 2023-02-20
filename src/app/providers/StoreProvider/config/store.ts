import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'

export function createReduxStore (initialState?: StateSchema): ReturnType<typeof configureStore> {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
