import { useUpdateWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { IWishlist } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface IProps {
  wishlist: IWishlist;
}

export default function WishlistCard({ wishlist }: IProps) {
  const book = wishlist.book;

  const { toast } = useToast();
  const [updateWishlist] = useUpdateWishlistMutation();

  const { user } = useAppSelector((state) => state.user);

  const date = `${book.publicationDate}`;

  const handleCurrentlyReading = async () => {
    const id = wishlist._id;
    const isCurrentlyReading = wishlist.currentlyReading;

    const options = { id, data: { currentlyReading: !isCurrentlyReading } };
    const result = await updateWishlist(options);

    toast({
      description: 'Added to currently reading.',
    });

    console.log({ result });
  };

  const handlePlanToRead = async () => {
    const id = wishlist._id;
    const isPlanToRead = wishlist.planToRead;

    const options = { id, data: { planToRead: !isPlanToRead } };
    const result = await updateWishlist(options);

    toast({
      description: 'Added plan to read.',
    });

    console.log({ result });
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
        <>
          <Button onClick={handleCurrentlyReading}>Currently Reading</Button>
          <Button onClick={handlePlanToRead}>Plan to Read</Button>
          <Button>Finished</Button>
        </>
      )}
    </div>
  );
}
