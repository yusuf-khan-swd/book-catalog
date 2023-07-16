import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading } = useSingleBookQuery(id);
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );

  if (isLoading || userLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  const userIsBookCreator = user?.email === book?.user;

  const date = `${book.publicationDate}`;

  const handleBookDelete = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div className="flex min-h-[290px] max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Rating: {book?.author}</p>
          <p>Genre: {book?.genre}</p>
          <p>Publication Date: {date}</p>
          <Button>Add to Bookmark</Button>
          {userIsBookCreator && (
            <div>
              <Button>Edit</Button>
              <Button onClick={() => handleBookDelete(book._id)}>Delete</Button>
            </div>
          )}
        </div>
      </div>
      {/* <BookReview id={id!} /> */}
    </>
  );
}
