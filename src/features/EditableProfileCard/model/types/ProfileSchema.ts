import { Profile } from 'entities/Profile/model/types/profile'

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface ProfileSchema {
  data?: Profile | null
  form?: Profile | null
  isLoading?: boolean
  readonly?: boolean
  error?: string | undefined
  validateErrors?: ValidateProfileError[]
}
