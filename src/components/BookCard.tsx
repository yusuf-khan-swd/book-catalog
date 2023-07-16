import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (book: IBook) => {
    dispatch(addToCart(book));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div className="rounded-2xl h-[180px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
      <Link to={`/book-details/${book._id}`} className="w-full">
        <h1 className="text-xl font-semibold">{book?.title}</h1>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
      </Link>
      <Button variant="default" onClick={() => handleAddProduct(book)}>
        Add to Wishlist
      </Button>
    </div>
  );
}
