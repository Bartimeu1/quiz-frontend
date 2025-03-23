import { RootState } from '../store';

export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
