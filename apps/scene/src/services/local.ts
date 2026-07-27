import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse } from 'next-api-handler';

import type { PlaceCardProps } from '@/components/place-card';
import type { SceneCardProps } from '@/components/scene-card';

export const localApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getHotelCards: builder.query<
      ApiResponse<PlaceCardProps[]>,
      { keyword: string }
    >({
      query: (params) => ({ params, url: 'hotels' }),
    }),
    getRestaurantCards: builder.query<
      ApiResponse<PlaceCardProps[]>,
      { keyword: string }
    >({
      query: (params) => ({ params, url: 'restaurants' }),
    }),
    getSceneCards: builder.query<
      ApiResponse<SceneCardProps[]>,
      { keyword: string } & Partial<Local.SearchQuery>
    >({
      query: (params) => ({
        params,
        url: 'scenes',
      }),
    }),
  }),
  reducerPath: 'local',
});

export const {
  useLazyGetSceneCardsQuery,
  useLazyGetRestaurantCardsQuery,
  useLazyGetHotelCardsQuery,
} = localApi;
