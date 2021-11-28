import type { BusEstimation, BusStation } from '@f2e/ptx';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SuccessApiResponse } from 'next-api-handler';

import type { BusEstimationParam } from '@/pages/api/bus-estimation';
import type { StationQueryParam } from '@/pages/api/bus-nearby';

const busEstimationAdapter = createEntityAdapter<BusEstimation>({
  selectId: (busEstimation) => busEstimation.StopUID,
});

export const localApi = createApi({
  reducerPath: 'local',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getBusEstimation: builder.query<
      EntityState<BusEstimation>,
      BusEstimationParam
    >({
      query: (params) => ({
        url: 'bus-estimation',
        params,
      }),
      transformResponse: (res: SuccessApiResponse<BusEstimation[]>) =>
        busEstimationAdapter.addMany(
          busEstimationAdapter.getInitialState(),
          res.data,
        ),
    }),
    getNearByBus: builder.mutation<
      SuccessApiResponse<BusStation[]>,
      Record<keyof StationQueryParam, number>
    >({
      query: ({ lat, lng }) => `bus-nearby?lat=${lat}&lng=${lng}`,
    }),
  }),
});

export const busEstimationSelector = busEstimationAdapter.getSelectors();

export const { useGetBusEstimationQuery, useGetNearByBusMutation } = localApi;
