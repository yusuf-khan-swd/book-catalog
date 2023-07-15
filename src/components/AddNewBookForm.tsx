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

interface IAddNewBookInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
const AddNewBookForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IAddNewBookInputs>();

  const currentTime = new Date();

  const onSubmit = async (data: IAddNewBookInputs) => {
    console.log({ ...data, publicationDate: currentTime });
  };

  const clearForm = () => {
    clearErrors();
    reset();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add A New Book</CardTitle>
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
  );
};

export default AddNewBookForm;
