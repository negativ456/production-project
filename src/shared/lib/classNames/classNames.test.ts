import { classNames } from './classNames'

describe('classNames', () => {
  test('first param', () => {
    expect(classNames('someClass')).toBe('someClass')
  })
  test('with additional param', () => {
    expect(classNames('someClass', {}, ['class1'])).toBe('someClass class1')
  })
  test('with mod param true', () => {
    expect(classNames('someClass', { opened: true })).toBe('someClass opened')
  })
  test('with mod param false', () => {
    expect(classNames('someClass', { opened: false })).toBe('someClass')
  })
  test('with all params', () => {
    expect(classNames('someClass', { opened: true }, ['class1'])).toBe('someClass class1 opened')
  })
})
