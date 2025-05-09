import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '@/types/user';
import {
  getLocalStorageItem,
  removeFromLocalStorage,
  setLocalStorageItem,
} from '@/utils';

interface UserState {
  user: userType | null;
  authToken: string | '';
  language: string;
  isMaintenance: boolean;
}
const authToken: string = getLocalStorageItem('token') || '';
const language: string = getLocalStorageItem('userSelectedLanguage') || 'en';
const storedUser: string = getLocalStorageItem('auth') || null;

const initialState: UserState = {
  user: typeof storedUser === 'object' ? storedUser : null,
  authToken,
  language,
  isMaintenance: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType | null>) => {
      state.user = action.payload;
      state.authToken = action.payload?.token || '';
      setLocalStorageItem('auth', action.payload);
      setLocalStorageItem('token', action.payload?.token);
    },

    updateUser: (state, action: PayloadAction<Partial<userType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        setLocalStorageItem('auth', state.user);
      }
    },

    setResetPasswordToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload || '';
      setLocalStorageItem('token', action.payload);
    },

    setMaintenance: (state, action: PayloadAction<boolean>) => {
      state.isMaintenance = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
      state.authToken = '';
      removeFromLocalStorage('auth');
      removeFromLocalStorage('token');
    },
  },
});

export const {
  setUser,
  updateUser,
  removeUser,
  setResetPasswordToken,
  setMaintenance,
} = authSlice.actions;

export default authSlice.reducer;
