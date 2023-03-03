import { createSlice } from '@reduxjs/toolkit'
import { ProfileSchema } from 'entities/Profile/model/types/profile'

const initialState: ProfileSchema = {
  data: null,
  error: null,
  isLoading: false,
  readonly: true
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  }
})
export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
