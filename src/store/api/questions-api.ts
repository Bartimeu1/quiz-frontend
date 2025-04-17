import { createApi } from '@reduxjs/toolkit/query/react';

import {
  QuestionType,
  GetTestQuestionsRequest,
  GetTestQuestionsResponse,
} from '@root/types/questions';

import { createBaseQueryWithReauth } from './base-query';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/questions'),
  endpoints: (builder) => ({
    createQuestion: builder.mutation<void, QuestionType>({
      query: (data) => ({
        url: '/create-question',
        method: 'POST',
        body: data,
      }),
    }),
    getTestQuestions: builder.query<
      GetTestQuestionsResponse,
      GetTestQuestionsRequest
    >({
      query: ({ testId }) => ({
        url: `/${testId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateQuestionMutation, useGetTestQuestionsQuery } =
  questionsApi;
