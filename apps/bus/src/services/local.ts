import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ONE_HOUR = 60 * 60;

// eslint-disable-next-line import/prefer-default-export
export const localApi = createApi({
  reducerPath: 'local',
  keepUnusedDataFor: ONE_HOUR,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (_builder) => ({}),
});
