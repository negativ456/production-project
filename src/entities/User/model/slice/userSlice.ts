import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorageKeys';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
  userData: null,
  mounted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      setFeatureFlags(action.payload.features);
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
    },
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveJsonSettings.fulfilled, (state, action) => {
      if (state.userData) {
        state.userData.jsonSettings = action.payload;
      }
    });
    builder.addCase(initAuthData.fulfilled, (state, action) => {
      state.userData = action.payload;
      setFeatureFlags(action.payload.features);
      state.mounted = true;
    });
    builder.addCase(initAuthData.rejected, (state) => {
      state.mounted = true;
    });
  },
});
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
