import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SuccessApiResponse } from 'next-api-handler';

import type { StationQueryParam, StationWithBike } from '@/pages/api/stations';

export const localApi = createApi({
  reducerPath: 'local',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getStations: builder.query<
      SuccessApiResponse<StationWithBike[]>,
      Record<keyof StationQueryParam, number>
    >({
      query: ({ lat, lng }) => `stations?lat=${lat}&lng=${lng}`,
    }),
  }),
});

export const { useLazyGetStationsQuery } = localApi;
