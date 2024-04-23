/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function UserLists({ contacts, setSelectedUser }) {
  return (
    <div className="px-2 pt-3 sm:pt-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-slate-300 dark:scrollbar-track-slate-800 overflow-y-auto max-h-[90vh]">
      {contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((user, i) => (
          <button
            onClick={() => setSelectedUser(user)}
            key={i}
            className="flex w-full gap-4 mb-3 items-center p-1 rounded-full"
          >
            <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback className="uppercase">
                {user?.name.substr(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium md:text-base text-sm  text-left">
                {user.name}
              </h1>
            </div>
          </button>
        ))}
    </div>
  );
}
