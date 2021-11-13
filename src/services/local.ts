import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'next-api-handler';

export const localApi = createApi({
  reducerPath: 'local',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getSceneCards: builder.query<
      ApiResponse<PTX.SceneCard[]>,
      { keyword: string } & Partial<Local.SearchScenesQuery>
    >({
      query: (params) => ({
        url: 'scenes',
        params,
      }),
    }),
  }),
});

export const { useLazyGetSceneCardsQuery } = localApi;
