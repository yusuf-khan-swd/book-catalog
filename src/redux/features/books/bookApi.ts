import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentBooks: builder.query({
      query: () => '/recent-books',
    }),
    getBooks: builder.query({
      query: () => '/books',
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
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
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
  useGetRecentBooksQuery,
  useGetCommentQuery,
  useGetBooksQuery,
  usePostCommentMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
  useAddBookMutation,
} = bookApi;
