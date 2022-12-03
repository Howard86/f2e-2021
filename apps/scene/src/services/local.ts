import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'next-api-handler';

import { PlaceCardProps } from '@/components/PlaceCard';
import { SceneCardProps } from '@/components/SceneCard';
import { Local } from '@/types/local';

export const localApi = createApi({
  reducerPath: 'local',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getSceneCards: builder.query<
      ApiResponse<SceneCardProps[]>,
      { keyword: string } & Partial<Local.SearchScenesQuery>
    >({
      query: (params) => ({
        url: 'scenes',
        params,
      }),
    }),
    getRestaurantCards: builder.query<
      ApiResponse<PlaceCardProps[]>,
      { keyword: string }
    >({
      query: (params) => ({ url: 'restaurants', params }),
    }),
    getHotelCards: builder.query<
      ApiResponse<PlaceCardProps[]>,
      { keyword: string }
    >({
      query: (params) => ({ url: 'hotels', params }),
    }),
  }),
});

export const {
  useLazyGetSceneCardsQuery,
  useLazyGetRestaurantCardsQuery,
  useLazyGetHotelCardsQuery,
} = localApi;
