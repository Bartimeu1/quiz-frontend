import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReauth } from './base-query';
import { GetAllTestsResponse, CreateTestRequest } from '@root/types/tests';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/tests'),
  tagTypes: ['tests'],
  endpoints: (builder) => ({
    getAllTests: builder.query<GetAllTestsResponse, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['tests'],
    }),
    createTest: builder.mutation<void, CreateTestRequest>({
      query: (data) => ({
        url: '/create-test',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tests'],
    }),
  }),
});

export const { useGetAllTestsQuery, useCreateTestMutation } = testsApi;
