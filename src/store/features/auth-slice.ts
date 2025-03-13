import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { user: null, jwt: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      const { name, jwt } = action.payload;

      state.user = name;
      state.jwt = jwt;
    },
    logOut: () => INITIAL_STATE,
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
