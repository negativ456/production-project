import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileValidateErrors } from './getProfileValidateErrors'
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/ProfileSchema'
describe('getProfileValidateErrors.test', () => {
  const errors = [
    ValidateProfileError.SERVER_ERROR,
    ValidateProfileError.INCORRECT_AGE
  ]
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors
      }
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
