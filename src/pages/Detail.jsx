import Navbar from '@/components/Navbar';
import ChatReceiver from '@/components/chats/ChatReceiver';
import ChatSender from '@/components/chats/ChatSender';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export default function Detail() {
  return (
    <div className="bg-pink-500 p-4">
      <div className=" max-w-4xl w-full sm:grid sm:grid-cols-3 mx-auto">
        <div className="bg-slate-200 sm:block hidden w-full p-3 rounded-l-xl">
          <Input placeholder="Cari pengguna..." className="rounded-full" />
          <div className="mt-4">
            <Link
              to={'/'}
              className="flex gap-3 items-center bg-violet-300 p-1 rounded-full"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-medium md:text-base text-xs">detail</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-2 bg-indigo-600 rounded-r-xl relative">
          <Navbar />
          <ChatReceiver />
          <ChatSender />
        </div>
      </div>
    </div>
  );
}
