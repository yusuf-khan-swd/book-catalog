import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAddToWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: book, isLoading } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );

  const [addToWishlist] = useAddToWishlistMutation();

  const [deleteBook] = useDeleteBookMutation();

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

  const handleAddToWishlist = async (email: string, book: IBook) => {
    const wishlistData = {
      user: email,
      bookId: book._id,
      currentlyReading: false,
      planToRead: false,
      finished: false,
      book,
    };
    const result = await addToWishlist(wishlistData);

    toast({
      description: 'Added to wishlist successfully.',
    });

    console.log(result);
  };

  return (
    <>
      <div className="flex min-h-[290px] max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Rating: {book?.author}</p>
          <p>Genre: {book?.genre}</p>
          <p>Publication Date: {date}</p>
          {user.email && (
            <Button onClick={() => handleAddToWishlist(user.email!, book)}>
              Add to Wishlist
            </Button>
          )}
          {userIsBookCreator && (
            <div>
              <Link to={`/book-edit/${book._id}`}>
                <Button>Edit</Button>
              </Link>
              <Button
                className="ml-2"
                onClick={() => handleBookDelete(book._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
