import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReauth } from './base-query';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/user'),
  endpoints: (builder) => ({
    test: builder.query({
      query: () => ({
        url: '/test',
        method: 'GET',
      }),
    }),
  }),
});

export const { useTestQuery } = testApi;
