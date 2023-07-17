import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentBooks: builder.query({
      query: () => '/recent-books',
    }),
    getBooks: builder.query({
      query: (query) => `/books?${query}`,
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ['reviews'],
    }),
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

export const {
  useGetRecentBooksQuery,
  useGetReviewQuery,
  useGetBooksQuery,
  usePostReviewMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
  useAddBookMutation,
  useAddToWishlistMutation,
  useGetWishlistQuery,
} = bookApi;
