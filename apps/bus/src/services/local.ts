import type { BusEstimationInfo, BusStationInfo } from '@f2e/ptx';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SuccessApiResponse } from 'next-api-handler';

import type { BusEstimationParam } from '@/pages/api/bus/estimation';
import type { StationQueryParam } from '@/pages/api/bus/nearby';

const busEstimationAdapter = createEntityAdapter<BusEstimationInfo>({
  selectId: (busEstimation) => busEstimation.StopUID,
});

export const localApi = createApi({
  reducerPath: 'local',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getBusEstimation: builder.query<
      EntityState<BusEstimationInfo>,
      BusEstimationParam
    >({
      query: (params) => ({
        url: 'bus/estimation',
        params,
      }),
      transformResponse: (res: SuccessApiResponse<BusEstimationInfo[]>) =>
        busEstimationAdapter.addMany(
          busEstimationAdapter.getInitialState(),
          res.data,
        ),
    }),
    getNearByBus: builder.mutation<
      SuccessApiResponse<BusStationInfo[]>,
      Record<keyof StationQueryParam, number>
    >({
      query: ({ lat, lng }) => `bus/nearby?lat=${lat}&lng=${lng}`,
    }),
  }),
});

export const busEstimationSelector = busEstimationAdapter.getSelectors();

export const { useGetBusEstimationQuery, useGetNearByBusMutation } = localApi;
