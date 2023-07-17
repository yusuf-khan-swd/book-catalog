import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-ashy.vercel.app',
  }),
  tagTypes: ['reviews'],
  endpoints: () => ({}),
});

// http://localhost:5000
// https://book-catalog-server-ashy.vercel.app
