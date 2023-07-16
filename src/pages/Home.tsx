import BookCard from '@/components/BookCard';
import { useGetRecentBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Key } from 'react';

export default function Home() {
  const { data, isLoading } = useGetRecentBooksQuery(undefined);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const recentBooksData = data?.data;

  return (
    <div className="grid max-w-7xl mx-auto relative ">
      <div className="grid grid-cols-3 gap-10 pb-20">
        {recentBooksData?.map((book: IBook, index: Key | null | undefined) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
