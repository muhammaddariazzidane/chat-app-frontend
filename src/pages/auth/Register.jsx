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

const RegisterSchema = z
  .object({
    name: z.string().max(50, { message: 'Nama maksimal 50 karakter' }),
    email: z.string().email('Email harus valid'),
    password: z.string().min(5, { message: 'Kata sandi minimal 5 karakter' }),
  })
  .required();

export default function Register() {
  const navigate = useNavigate();
  const { setNewUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterSchema),
  });
  const handleRegister = async (data) => {
    const response = await setNewUser(data);
    if (response?.status === 201) {
      navigate('/');
    }
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md mx-auto w-full flex flex-col justify-center min-h-screen p-3"
      >
        <Card>
          <CardHeader>
            <CardTitle>Daftar ke Chat Cuy</CardTitle>
            <CardDescription>
              Silahkan isi nama, email dan password mu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" placeholder="Jhon doe" {...register('name')} />
                <p className="text-sm font-medium text-destructive dark:text-red-500">
                  {errors?.name?.message}
                </p>
              </div>
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
          <CardFooter className="flex justify-between ">
            <Button
              variant="link"
              className="px-0"
              onClick={() => navigate('/')}
            >
              Sudah punya akun?
            </Button>

            <Button disabled={isSubmitting} type="submit">
              Daftar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </MainLayout>
  );
}
