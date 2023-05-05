import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArgs } from './StateSchema'
import { userReducer } from '@/entities/User'
import { createReducerManager } from '../config/reducerManager'
import { $api } from '@/shared/api/api'
import { scrollReducer } from '@/widgets/Page'
import { rtkApi } from '@/shared/api/rtkApi'

export function createReduxStore
(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scroll: scrollReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  }
  const reducerManager = createReducerManager(rootReducer)
  const extraArg: ThunkExtraArgs = {
    api: $api
  }
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg
      }
    }).concat(rtkApi.middleware)
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.reducerManager = reducerManager
  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
