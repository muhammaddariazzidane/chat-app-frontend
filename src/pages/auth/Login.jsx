import MainLayout from '@/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const LoginSchema = z
  .object({
    email: z.string().email('Email harus valid'),
    password: z.string(),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();
  const { setAuthUser, errorMessages } = useUserStore();
  if (errorMessages) {
    if (errorMessages)
      toast(errorMessages, {
        position: 'top-center',
        action: {
          label: 'X',
          onClick: () => {},
        },
        style: {
          background: 'darkblue',
          color: 'white',
        },
      });
  }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  const handleLogin = async (data) => {
    await setAuthUser(data);
  };
  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-md mx-auto w-full flex flex-col justify-center min-h-screen p-3"
      >
        <Card>
          <CardHeader>
            <CardTitle>Masuk ke Chat Cuy</CardTitle>
            <CardDescription>
              Silahkan isi email dan password mu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Jhon@gmail.com"
                  {...register('email')}
                />
                <p className="text-sm font-medium text-destructive dark:text-red-500">
                  {errors?.email?.message}
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*****"
                  {...register('password')}
                />
                <p className="text-sm font-medium text-destructive dark:text-red-500">
                  {errors?.password?.message}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap sm:flex-nowrap">
            <Button
              variant="link"
              className="px-0"
              onClick={() => navigate('/register')}
            >
              Belum punya akun?
            </Button>

            <Button tabIndex={0} disabled={isSubmitting} type="submit">
              Masuk
            </Button>
          </CardFooter>
        </Card>
      </form>
    </MainLayout>
  );
}
