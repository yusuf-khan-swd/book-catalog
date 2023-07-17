import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IBook } from '@/types/globalTypes';
import { Key, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ISearch {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
}

const SearchBook = () => {
  const { register, handleSubmit } = useForm<ISearch>();

  const [books, setBooks] = useState<IBook[]>();

  const onSubmit = async (data: ISearch) => {
    let queries = '';
    const { searchTerm, genre, publicationYear } = data;

    if (searchTerm) {
      queries +=
        queries.length > 0
          ? `&searchTerm=${searchTerm}`
          : `searchTerm=${searchTerm}`;
    }

    if (genre) {
      queries += queries.length > 0 ? `&genre=${genre}` : `genre=${genre}`;
    }

    if (publicationYear) {
      queries +=
        queries.length > 0
          ? `&publicationYear=${publicationYear}`
          : `publicationYear=${publicationYear}`;
    }

    const response = await fetch(
      `https://book-catalog-server-ashy.vercel.app/books?${queries}`
    );
    const result = await response.json();

    setBooks(result.data);
  };

  return (
    <div className="min-h-screen">
      <div className="w-[350px] m-2 mx-auto mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex">
                <Input
                  id="search"
                  {...register('searchTerm')}
                  type="text"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex">
                <Input
                  id="search"
                  {...register('genre')}
                  type="text"
                  className="rounded-full"
                  placeholder="Search by Genre"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex">
                <Input
                  id="search"
                  {...register('publicationYear')}
                  type="text"
                  className="rounded-full"
                  placeholder="Search by publicationYear"
                />
              </div>
            </div>
            <Button type={'submit'}>Search</Button>
          </div>
        </form>
      </div>

      <div className="grid max-w-7xl mx-auto relative ">
        <div className="grid grid-cols-3 gap-10 pb-20">
          {books?.map((book: IBook, index: Key | null | undefined) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
