import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceState } from './types';

const INITIAL_STATE: AuthSliceState = { user: null, accessToken: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    clearCredentials: () => INITIAL_STATE,
  },
});

export const { setCredentials, setUser, setAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
