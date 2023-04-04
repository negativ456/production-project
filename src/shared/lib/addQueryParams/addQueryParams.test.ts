import { getQueryParams } from './addQueryParams'

describe('addQueryParams.test', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value'
    })
    expect(params).toBe('?test=value')
  })
  test('test with multiple param', () => {
    const params = getQueryParams({
      test: 'value',
      test1: 'value1'
    })
    expect(params).toBe('?test=value&test1=value1')
  })
  test('test with undefined', () => {
    const params = getQueryParams({})
    expect(params).toBe('?')
  })
})
