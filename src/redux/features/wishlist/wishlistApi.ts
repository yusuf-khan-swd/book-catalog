import { api } from '@/redux/api/apiSlice';

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: 'POST',
        body: data,
      }),
    }),
    getWishlist: builder.query({
      query: (email) => `/wishlist/${email}`,
    }),
  }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery } = wishlistApi;
