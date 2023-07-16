import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ISearch {
  searchTerm: string;
}

const SearchBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearch>();

  const onSubmit = async (data: ISearch) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen">
      <div className="w-[350px] m-4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <p className="text-red-500">{errors.searchTerm?.message}</p>
              <div className="flex">
                <Input
                  id="search"
                  {...register('searchTerm', {
                    required: 'Search query is required',
                  })}
                  type="text"
                  className="rounded-full"
                />
                <Button type={'submit'}>Search</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBook;
