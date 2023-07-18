import { api } from '@/redux/api/apiSlice';

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (email) => `/wishlist/${email}`,
      providesTags: ['wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wishlist'],
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wishlist'],
    }),
    deleteFromWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wishlist'],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useUpdateWishlistMutation,
  useDeleteFromWishlistMutation,
} = wishlistApi;
