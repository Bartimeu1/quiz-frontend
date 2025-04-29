import { createApi } from '@reduxjs/toolkit/query/react';

import { createBaseQueryWithReauth } from './base-query';

import { CreateRoomRequest, CreateRoomResponse } from '@root/types/rooms';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: createBaseQueryWithReauth('http://localhost:3000/rooms'),
  endpoints: (builder) => ({
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: (data) => ({
        url: '/create-room',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomsApi;
