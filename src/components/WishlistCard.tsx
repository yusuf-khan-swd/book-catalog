import {
  useDeleteFromWishlistMutation,
  useUpdateWishlistMutation,
} from '@/redux/features/wishlist/wishlistApi';
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
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();

  const { user } = useAppSelector((state) => state.user);

  const date = `${book.publicationDate}`;

  const handleCurrentlyReading = async () => {
    const id = wishlist._id;
    const isCurrentlyReading = wishlist.currentlyReading;

    const options = { id, data: { currentlyReading: !isCurrentlyReading } };
    const result = await updateWishlist(options);

    if (isCurrentlyReading === false) {
      toast({
        description: 'Added to currently reading.',
      });
    } else {
      toast({
        variant: 'destructive',
        description: 'Remove from currently reading.',
      });
    }

    console.log({ result });
  };

  const handlePlanToRead = async () => {
    const id = wishlist._id;
    const isPlanToRead = wishlist.planToRead;

    const options = { id, data: { planToRead: !isPlanToRead } };
    const result = await updateWishlist(options);

    if (isPlanToRead === false) {
      toast({
        description: 'Added to plan to read.',
      });
    } else {
      toast({
        variant: 'destructive',
        description: 'Remove from plan to read.',
      });
    }

    console.log({ result });
  };

  const handleFinished = async () => {
    const id = wishlist._id;
    const isFinished = wishlist.finished;

    const modifiedData =
      isFinished === false
        ? { finished: true, planToRead: false, currentlyReading: false }
        : { finished: false };

    const options = { id, data: modifiedData };
    const result = await updateWishlist(options);

    if (isFinished === false) {
      toast({
        description: 'Added to finished reading.',
      });
    } else {
      toast({
        variant: 'destructive',
        description: 'Remove from finished reading.',
      });
    }

    console.log(result);
  };

  const handleDelete = async () => {
    const id = wishlist._id;
    await deleteFromWishlist(id);

    toast({
      variant: 'destructive',
      description: 'Book Deleted successfully.',
    });
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
          <Button onClick={handleFinished}>Finished</Button>
          <Button onClick={handleDelete}>Remove</Button>
        </>
      )}
    </div>
  );
}
