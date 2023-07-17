import { useAddToWishlistMutation } from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface IProps {
  book: IBook;
}

export default function WishlistCard({ book }: IProps) {
  const { toast } = useToast();
  const [addToWishlist] = useAddToWishlistMutation();

  const { user } = useAppSelector((state) => state.user);

  const date = `${book.publicationDate}`;

  const handleAddToWishlist = async (email: string, book: IBook) => {
    const wishlistData = {
      user: email,
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
    <div className="rounded-2xl flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
      <Link to={`/book-details/${book._id}`} className="w-full">
        <h3 className="text-xl font-semibold">{book?.title}</h3>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>Publication Date: {date}</p>
      </Link>
      {user.email && (
        <Button onClick={() => handleAddToWishlist(user.email!, book)}>
          Add to Wishlist
        </Button>
      )}
    </div>
  );
}
