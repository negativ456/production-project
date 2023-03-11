import { fetchProfileData } from './fetchProfileData'
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
const data = {
  first: 'name',
  lastname: 'surname',
  age: 23,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Mos',
  username: '123'
}
describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data }))
    const result = await thunk.callThunk()
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })
  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk()
    expect(result.meta.requestStatus).toBe('rejected')
  })
})
