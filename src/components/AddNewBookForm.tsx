import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/redux/features/user/userApi';
import { loginUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}
const AddNewBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const [loginUserUsingDb] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { state } = useLocation();

  const path = state?.path;

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    const { email, password } = data;

    await loginUserUsingDb({ email, password });

    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      path ? navigate(path) : navigate('/');
    }
  }, [user.email, isLoading, navigate, path]);

  return (
    <div className="grid grid-cols-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>Login with email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
};

export default AddNewBookForm;
