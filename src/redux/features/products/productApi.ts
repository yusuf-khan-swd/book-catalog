import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getComment: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
