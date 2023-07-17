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
  }),
});

export const {
  useGetRecentBooksQuery,
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
  useAddBookMutation,
} = bookApi;
