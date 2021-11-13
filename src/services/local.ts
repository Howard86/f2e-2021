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
    getRestaurantCards: builder.query<
      ApiResponse<PTX.RestaurantCard[]>,
      { keyword: string }
    >({
      query: (params) => ({ url: 'restaurants', params }),
    }),
  }),
});

export const { useLazyGetSceneCardsQuery, useLazyGetRestaurantCardsQuery } =
  localApi;
