import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArgs } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager'
import { $api } from 'shared/api/api'
import { NavigateOptions } from 'react-router'
import { To } from 'history'

export function createReduxStore
(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>, navigate?: (to: To, options?: NavigateOptions) => void) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer
  }
  const reducerManager = createReducerManager(rootReducer)
  const extraArg: ThunkExtraArgs = {
    api: $api,
    navigate
  }
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg
      }
    })
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.reducerManager = reducerManager
  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
