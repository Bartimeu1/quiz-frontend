import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReauth } from './base-query';
import {
  UserType,
  ChangeAvatarRequest,
  ChangePasswordRequest,
} from '@root/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/user'),
  endpoints: (builder) => ({
    changeAvatar: builder.mutation<UserType, ChangeAvatarRequest>({
      query: (data) => ({
        url: '/change-avatar',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (data) => ({
        url: '/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useChangeAvatarMutation, useChangePasswordMutation } = userApi;
