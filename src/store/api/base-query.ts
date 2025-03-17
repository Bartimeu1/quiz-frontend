import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query';
import { setAccessToken, logOut } from '../features/auth-slice';

import { RootState } from '../store';

const UNAUTHORIZED_ERROR = 401;

export const createBaseQueryWithReauth = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const baseQueryWithReauth: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === UNAUTHORIZED_ERROR) {
      const refreshResult = await baseQuery(
        { url: '/auth/refresh', method: 'POST' },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        api.dispatch(setAccessToken(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }

    return result;
  };

  return baseQueryWithReauth;
};
