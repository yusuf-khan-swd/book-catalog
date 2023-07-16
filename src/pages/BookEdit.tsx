import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  useAddBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { IBookForm } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

const BookEdit = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IBookForm>();

  const { id } = useParams();
  const { toast } = useToast();
  const { data: book, isLoading } = useSingleBookQuery(id);

  const [addBook] = useAddBookMutation();

  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );
  if (isLoading || userLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  const currentTime = new Date();

  const onSubmit = async (data: IBookForm) => {
    console.log({
      ...data,
      publicationDate: currentTime,
      user: user.email,
    });
    const bookData = {
      ...data,
      publicationDate: currentTime,
      user: user.email,
    };
    await addBook(bookData);

    toast({
      description: 'Book Edit successfully.',
    });
  };

  const clearForm = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Edit the book</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  {...register('title', {
                    required: 'Book title is required',
                  })}
                  type="text"
                  defaultValue={book?.title}
                />
                <p className="text-red-500">{errors.title?.message}</p>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="author">Author*</Label>
                <Input
                  id="author"
                  {...register('author', {
                    required: 'Author name is required',
                  })}
                  type="text"
                />
                <p className="text-red-500">{errors.author?.message}</p>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="genre">Genre*</Label>
                <Input
                  id="genre"
                  {...register('genre', {
                    required: 'Genre is required',
                  })}
                  type="text"
                />
                <p className="text-red-500">{errors.genre?.message}</p>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="publicationDate">Publication Date*</Label>
                <Input
                  id="publicationDate"
                  defaultValue={`${currentTime.toUTCString()}`}
                  disabled={true}
                  type="text"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => clearForm()} type="button">
              Clear
            </Button>
            <Button type={'submit'}>Add Book</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BookEdit;
