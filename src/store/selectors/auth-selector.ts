import { RootState } from '../store';
import { UserType } from '@root/types/user';

export const accessTokenSelector = (state: RootState) => state.auth.accessToken;

export const userSelector = (state: RootState) => state.auth.user as UserType;
