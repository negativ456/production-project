import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorageKeys';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    try {
      if (!userId) {
        throw new Error();
      }

      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, response.features?.isAppRedesigned ? 'new' : 'old');

      return response;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
