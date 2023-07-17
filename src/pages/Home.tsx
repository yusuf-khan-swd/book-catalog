import BookCard from '@/components/BookCard';
import { useGetRecentBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Key } from 'react';

export default function Home() {
  const { data, isLoading } = useGetRecentBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <h1 className="min-h-screen text-center">Loading...</h1>;
  }

  const recentBooksData = data?.data;

  return (
    <div className="grid max-w-7xl mx-auto relative min-h-screen">
      <h3 className="text-semibold text-2xl mb-4">Recently Added Books</h3>
      <div className="grid grid-cols-3 gap-10 pb-20">
        {recentBooksData?.map((book: IBook, index: Key | null | undefined) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
