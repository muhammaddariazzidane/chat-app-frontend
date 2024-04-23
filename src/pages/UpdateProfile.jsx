/* eslint-disable react/prop-types */
import Navbar from '@/components/Navbar';
import MainLayout from '@/layout/MainLayout';
import { useUserStore } from '@/store/useUserStore';
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { v4 } from 'uuid';
import { FileType } from 'lucide-react';
import { toast } from 'sonner';

export default function UpdateProfile() {
  const { user, updateUser, errorMessages } = useUserStore();

  if (errorMessages)
    toast('Ooppss ada yang salah, silahkan refresh halaman nya', {
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

  const profileInitialValue = {
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture ? user.profilePicture : null,
  };

  const { register, reset, handleSubmit } = useForm({
    defaultValues: profileInitialValue,
  });

  const handleUpdateProfile = async (data) => {
    if (
      data.name === user.name &&
      data.email === user.email &&
      data.profilePicture === user.profilePicture
    ) {
      return;
    } else if (
      data.profilePicture === user.profilePicture ||
      data.profilePicture.length == 0
    ) {
      const response = await updateUser(data);
      if (response.status === 200) {
        toast(response?.message, {
          position: 'top-center',
          action: {
            label: 'X',
            onClick: () => {},
          },
          style: {
            background: 'green',
          },
        });
      }
    } else {
      const imgRef = ref(storage, `${v4()}.${FileType}`);
      uploadBytes(imgRef, data.profilePicture?.[0])
        .then(async () => {
          const url = await getDownloadURL(imgRef);
          const userUpdated = {
            name: data.name,
            email: data.email,
            profilePicture: url,
          };
          const response = await updateUser(userUpdated);
          if (response.status === 200) {
            reset({
              profilePicture: user.profilePicture,
            });
            toast(response?.message, {
              position: 'top-center',
              action: {
                label: 'X',
                onClick: () => {},
              },
              style: {
                background: 'green',
              },
            });
          }
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <MainLayout>
      <div className="max-h-screen min-h-screen  flex">
        <div className="max-w-4xl  w-full gap-3 h-auto sm:grid sm:grid-cols-3 mx-auto">
          <div className="pt-32 px-3 ">
            <Card className="min-w-[16rem] w-full mx-auto shadow-md">
              <CardHeader>
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="uppercase text-center">
                    {user.name.substr(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-center  text-base">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-center">
                  {user.email}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div
            className={`col-span-2 h-fit min-h-full sm:mt-0 max-h-screen  relative`}
          >
            <Navbar />
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="pt-32 px-3"
            >
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Edit Profil</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 ">
                  <Input type="text" {...register('name')} autoComplete="off" />
                  <Input type="email" {...register('email')} readOnly />
                  <Input
                    className="bg-white text-black cursor-pointer"
                    id="profilePicture"
                    type="file"
                    {...register('profilePicture')}
                    accept="image/*"
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit">Simpan</Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
