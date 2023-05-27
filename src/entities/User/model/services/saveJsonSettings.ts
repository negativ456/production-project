import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
  'user/saveJsonSettings',
  async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const user = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    try {
      if (!user) {
        throw new Error();
      }

      const response = await dispatch(
        setJsonSettingsMutation({
          userId: user.id,
          jsonSettings: {
            ...currentSettings,
            ...newJsonSettings,
          },
        })
      ).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue('error');
      }

      return response.jsonSettings;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
