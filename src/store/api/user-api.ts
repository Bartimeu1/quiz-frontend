import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReauth } from './base-query';
import {
  UserType,
  GetUsersRequest,
  ChangeAvatarRequest,
  ChangeAvatarResponse,
  ChangePasswordRequest,
} from '@root/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/users'),
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], GetUsersRequest>({
      query: ({ nameOrEmail }) => {
        const searchParams = nameOrEmail ? { query: nameOrEmail } : {};

        return {
          url: '/',
          method: 'GET',
          params: searchParams,
        };
      },
    }),
    getLeaders: builder.query<UserType[], void>({
      query: () => ({
        url: '/leaders',
        method: 'GET',
      }),
    }),
    changeAvatar: builder.mutation<ChangeAvatarResponse, ChangeAvatarRequest>({
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

export const {
  useLazyGetUsersQuery,
  useGetLeadersQuery,
  useChangeAvatarMutation,
  useChangePasswordMutation,
} = userApi;
