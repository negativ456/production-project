import axios from 'axios'
import { loginByUsername } from './loginByUsername'
import { userActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk'
jest.mock('axios')
const mockedAxios = jest.mocked(axios, true)
describe('loginByUsername.test', () => {
  // let dispatch: Dispatch
  // let getState: () => StateSchema
  // beforeEach(() => {
  //   dispatch = jest.fn()
  //   getState = jest.fn()
  // })
  test('success', async () => {
    const user = { username: '123', id: 1 }
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: user }))
    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({ username: '123', password: '123' })
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUser(user))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(user)
  })
  test('error', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({ username: '123', password: '123' })
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
