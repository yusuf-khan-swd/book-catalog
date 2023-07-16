import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useSingleBookQuery(id);
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );

  const [deleteBook] = useDeleteBookMutation();
  const { toast } = useToast();

  if (isLoading || userLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  const userIsBookCreator = user?.email === book?.user;

  const date = `${book.publicationDate}`;

  const handleBookDelete = async (id: string) => {
    const permissionGrant = window.confirm(
      'Are you sure you want delete the book'
    );

    if (permissionGrant) {
      await deleteBook(id);
      toast({
        variant: 'destructive',
        description: 'Book Deleted successfully.',
      });
      navigate('/home');
    }
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
