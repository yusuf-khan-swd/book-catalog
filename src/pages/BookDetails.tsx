import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isLoading } = useSingleBookQuery(id);

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.name}</h1>
          <p className="text-xl">Rating: {book?.rating}</p>
          <ul className="space-y-1 text-lg">
            {book?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to Bookmark</Button>
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
