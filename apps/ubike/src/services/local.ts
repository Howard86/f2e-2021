import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SuccessApiResponse } from 'next-api-handler';

import type {
  BikeCyclingWithGeoJson,
  CyclingQueryParam,
} from '@/pages/api/cyclings';
import type { StationQueryParam, StationWithBike } from '@/pages/api/stations';

const ONE_HOUR = 60 * 60;

export const localApi = createApi({
  reducerPath: 'local',
  keepUnusedDataFor: ONE_HOUR,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getStationsByCoordinate: builder.query<
      SuccessApiResponse<StationWithBike[]>,
      Record<keyof StationQueryParam, number>
    >({
      query: ({ lat, lng, r }) => `stations?lat=${lat}&lng=${lng}&r=${r}`,
    }),
    getCyclingByCity: builder.query<
      SuccessApiResponse<BikeCyclingWithGeoJson[]>,
      CyclingQueryParam['city']
    >({
      query: (citySlug) => `cyclings?city=${citySlug}`,
    }),
  }),
});

export const { useGetCyclingByCityQuery, useLazyGetStationsByCoordinateQuery } =
  localApi;
