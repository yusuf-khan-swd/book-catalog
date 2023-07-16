import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading } = useSingleBookQuery(id);

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  const date = `${book.publicationDate}`;

  return (
    <>
      <div className="flex min-h-[290px] max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Rating: {book?.author}</p>
          <p>Genre: {book?.genre}</p>
          <p>Publication Date: {date}</p>
          <Button>Add to Bookmark</Button>
        </div>
      </div>
      {/* <BookReview id={id!} /> */}
    </>
  );
}
