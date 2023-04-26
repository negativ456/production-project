import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema'
import { Profile } from '../../../../../entities/Profile/model/types/profile'

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>('profile/fetchProfileData',
  async (userId, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI
    try {
      const response = await extra.api.get<Profile>('/profile/' + userId)

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  })
