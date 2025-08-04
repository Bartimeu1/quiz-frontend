import { RootState } from '../store';
import { UserType, UserRole } from '@root/types/user';
import { createSelector } from '@reduxjs/toolkit';

export const accessTokenSelector = (state: RootState) => state.auth.accessToken;

export const userSelector = (state: RootState) => state.auth.user as UserType;

export const userIdSelector = createSelector([userSelector], (user) => user.id);

export const isAdminSelector = createSelector(
  [userSelector],
  (user) => user.role === UserRole.ADMIN,
);
