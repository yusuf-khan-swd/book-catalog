import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/register-user`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/login-user`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
