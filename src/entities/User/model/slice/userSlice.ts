import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorageKeys';
import { setFeatureFlags } from '@/shared/lib/features';

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
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload));
      setFeatureFlags(action.payload.features);
    },
    initUserData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const userData = JSON.parse(user) as User;
        state.userData = userData;
        setFeatureFlags(userData.features);
      }
      state.mounted = true;
    },
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
