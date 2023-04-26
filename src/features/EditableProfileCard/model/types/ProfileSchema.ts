import { Profile } from '@/entities/Profile/model/types/profile'
import { ValidateProfileError } from '../const/const'

export interface ProfileSchema {
  data?: Profile | null
  form?: Profile | null
  isLoading?: boolean
  readonly?: boolean
  error?: string | undefined
  validateErrors?: ValidateProfileError[]
}
