import { DeepPartial } from '@reduxjs/toolkit'
import { profileActions, profileReducer } from './profileSlice'
import { ProfileSchema } from '../types/ProfileSchema'

import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { ValidateProfileError } from '../const/const'

describe('profileSlice.test', () => {
  const data = {
    first: 'name',
    lastname: 'surname',
    age: 23,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Mos',
    username: '123'
  }
  test('set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false
    }
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true })
  })
  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: data
    }
    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ first: '123' })))
      .toEqual({
        form: {
          first: '123',
          lastname: 'surname',
          age: 23,
          currency: Currency.RUB,
          country: Country.Russia,
          city: 'Mos',
          username: '123'
        }
      })
  })
  test('update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    }
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
      isLoading: true,
      validateErrors: undefined
    })
  })
  test('update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    }
    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')))
      .toEqual({
        isLoading: false,
        validateErrors: undefined,
        readonly: true,
        form: data,
        data
      })
  })
})
