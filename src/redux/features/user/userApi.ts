import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
