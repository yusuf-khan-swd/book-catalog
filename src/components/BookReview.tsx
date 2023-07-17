import {
  useGetReviewQuery,
  usePostReviewMutation,
} from '@/redux/features/review/reviewApi';
import { useAppSelector } from '@/redux/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading: isReviewLoading } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const [postReview, { isLoading: isReviewPostLoading }] =
    usePostReviewMutation();

  if (isReviewLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  console.log(data);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(inputValue);
    event.preventDefault();

    const options = {
      id: id,
      data: { review: inputValue },
    };

    postReview(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {user.email ? (
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[30px]"
            onChange={handleChange}
            value={inputValue}
          />
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSend />
          </Button>
        </form>
      ) : (
        <p>
          Please{' '}
          <Link to="/login" className=" text-blue-500">
            login
          </Link>{' '}
          to provide a review
        </p>
      )}
      {isReviewPostLoading && <p>Posting...</p>}
      {!data?.reviews || data?.reviews?.length < 1 ? (
        <p>Review not available. Be a first Reviewers</p>
      ) : (
        <div className="mt-10">
          {data?.reviews.map((review: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
