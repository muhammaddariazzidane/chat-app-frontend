/* eslint-disable react/prop-types */
import { useUserStore } from '@/store/useUserStore';

import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DropDown from './elements/DropDown';
import SwitchDarkMode from './elements/SwitchDarkMode';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const { removeSelectedUser, selectedUser } = useUserStore();
  const { pathname } = useLocation();
  return (
    <div
      className={`fixed z-50 top-0 left-0 right-0 w-full ${
        selectedUser?.name
          ? 'py-4 sm:py-3'
          : pathname === '/update-profile'
          ? 'py-4 sm:py-3'
          : 'py-5'
      } border-b dark:bg-slate-800 bg-white max-w-4xl mx-auto`}
    >
      <div className="flex justify-between gap-3 px-4">
        <div className="flex gap-x-2 items-center">
          {pathname === '/update-profile' && (
            <Link to="/">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full  w-8 sm:w-10 h-8 sm:h-10"
              >
                <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
              </Button>
            </Link>
          )}
          {selectedUser?.name && (
            <>
              <Button
                onClick={removeSelectedUser}
                size="icon"
                variant="ghost"
                className="rounded-full  w-8 sm:w-10 h-8 sm:h-10"
              >
                <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
              </Button>
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                <AvatarImage src={selectedUser?.profilePicture} />
                <AvatarFallback className="uppercase bg-slate-400 text-white">
                  {selectedUser?.name.substr(0, 2)}
                </AvatarFallback>
              </Avatar>
            </>
          )}
          <h1 className="text-sm sm:text-base capitalize">
            {selectedUser?.name}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <SwitchDarkMode />
          <DropDown />
        </div>
      </div>
    </div>
  );
}
