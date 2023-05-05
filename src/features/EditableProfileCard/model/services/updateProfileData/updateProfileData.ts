import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfileData } from '../validateProfileDate/validateProfileData'

import { ValidateProfileError } from '../../const/const'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>('profile/updateProfileData',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI

    const formData = getProfileForm(getState())
    const errors = validateProfileData(formData)
    const id = formData?.id ?? ''
    if (errors.length) {
      return rejectWithValue(errors)
    }

    try {
      const response = await extra.api.put<Profile>(`/profile/${id}`, formData)

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  })
