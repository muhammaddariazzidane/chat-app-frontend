/* eslint-disable react/prop-types */

import { useChatStore } from '@/store/useChatStore';
import { Button } from '../ui/button';
import ChatReceiver from './ChatReceiver';
import ChatSender from './ChatSender';
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '@/lib/firebase';
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Upload } from 'lucide-react';
import { Image } from 'lucide-react';
import { Input } from '../ui/input';
import { FileText } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { useEffect } from 'react';
import ChatBodyLoader from '../loader/ChatBodyLoader';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const chatSchema = z
  .object({
    message: z.string().min(1, { message: 'Pesan tidak boleh kosong' }),
  })
  .required();

export default function ChatBody({ user, selectedUser }) {
  const { chats, getChats, isPreload, sendMessage } = useChatStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(chatSchema),
  });

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleSendMessage = (data) => {
    if (file) {
      const imgRef = ref(storage, `${v4()}.${fileType}`);

      uploadBytes(imgRef, file)
        .then(async () => {
          const url = await getDownloadURL(imgRef);
          const newChat = {
            message: data.message,
            file: url ? url : null,
          };
          sendMessage(newChat, selectedUser._id);
          reset({
            message: '',
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setFile(null));
    } else {
      sendMessage(data, selectedUser._id);
      reset({
        message: '',
      });
    }
  };
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileType(e.target.files[0].type.split('/')[1]);
  };
  useEffect(() => {
    getChats(selectedUser._id);
  }, [getChats, selectedUser._id]);

  if (errors?.message) {
    toast(errors?.message.message, {
      position: 'top-center',
      style: {
        background: 'red',
      },
      action: {
        label: 'X',
        onClick: () => {},
      },
    });
  }
  return (
    <div className="pt-16 sm:pt-20 pb-12 flex flex-col-reverse overflow-y-auto max-h-[90vh] min-h-screen h-fit scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-slate-300 dark:scrollbar-track-slate-800">
      <div>
        {isPreload ? (
          <ChatBodyLoader />
        ) : (
          chats.length > 0 &&
          chats.map((chat) => (
            <div key={chat._id}>
              {chat.sender._id === user._id ? (
                <ChatSender chat={chat} />
              ) : (
                <ChatReceiver chat={chat} />
              )}
            </div>
          ))
        )}
      </div>
      <div
        className={`left-0 right-0 w-full p-2 bg-white dark:bg-slate-950 fixed bottom-0`}
      >
        <form onSubmit={handleSubmit(handleSendMessage)} className="flex gap-2">
          <Input
            {...register('message')}
            className="w-full"
            placeholder="kirim pesan"
            autoComplete="off"
          />
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <Upload />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-center">{file?.name}</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex justify-center gap-x-8 mb-8">
                  <Button size="icon" className="relative cursor-pointer">
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="cursor-pointer w-10 z-20 h-10 rounded-sm opacity-0"
                      onChange={handleChangeFile}
                    />
                    <FileText className="fixed z-10 " />
                  </Button>
                  <Button size="icon" className="relative cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer w-10 z-20 h-10 rounded-sm opacity-0"
                      onChange={handleChangeFile}
                    />
                    <Image className="fixed z-10 " />
                  </Button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant="outline"
            size="icon"
          >
            <SendHorizonal />
          </Button>
        </form>
      </div>
    </div>
  );
}
