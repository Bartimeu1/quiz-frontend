import { createApi } from '@reduxjs/toolkit/query/react';

import {
  QuestionType,
  DeleteQuestionRequest,
  GetTestQuestionsRequest,
  GetTestQuestionsResponse,
} from '@root/types/questions';

import { createBaseQueryWithReauth } from './base-query';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/questions'),
  tagTypes: ['questions'],
  endpoints: (builder) => ({
    createQuestion: builder.mutation<void, QuestionType>({
      query: (data) => ({
        url: '/create-question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['questions'],
    }),
    deleteQuestion: builder.mutation<void, DeleteQuestionRequest>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['questions'],
    }),
    getTestQuestions: builder.query<
      GetTestQuestionsResponse,
      GetTestQuestionsRequest
    >({
      query: ({ testId }) => ({
        url: `/${testId}`,
        method: 'GET',
      }),
      providesTags: ['questions'],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetTestQuestionsQuery,
} = questionsApi;
