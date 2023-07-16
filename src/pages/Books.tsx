import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Key } from 'react';

export default function Books() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <h1 className="text-2xl text-center">Loading...</h1>;
  }

  const booksData = data.data;

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IBook, index: Key | null | undefined) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
