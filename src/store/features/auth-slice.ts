import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { user: null, accessToken: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    logOut: () => INITIAL_STATE,
  },
});

export const { setCredentials, setAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;
