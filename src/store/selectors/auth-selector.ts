import { RootState } from '../store';

export const accessTokenSelector = (state: RootState) => state.auth.accessToken;

export const userSelector = (state: RootState) => state.auth.user;
