/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import MainLayout from '@/layout/MainLayout';
import { useUserStore } from '@/store/useUserStore';
import DropDown from '@/components/elements/DropDown';
import SwitchDarkMode from '@/components/elements/SwitchDarkMode';
import UserLists from '@/components/users/UserLists';
import ChatBody from '@/components/chats/ChatBody';

export default function Home() {
  const { selectedUser, setSelectedUser, user, listContacts } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTermFromParams = searchParams.get('search');
    setSearchTerm(searchTermFromParams || '');
  }, [searchParams]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchParams({ search: event.target.value });
  };
  return (
    <MainLayout>
      <div className="max-h-screen min-h-screen flex">
        <div className="max-w-4xl w-full h-auto sm:grid sm:grid-cols-3 mx-auto">
          <div
            className={`w-full min-h-full h-fit max-h-screen transition-all ${
              selectedUser
                ? 'sm:scale-100 transition-all scale-0 '
                : 'transition-all '
            }`}
          >
            <div className="sticky top-0 z-50 border-b dark:bg-slate-800 bg-white w-full left-0 right-0 p-3">
              <div className="flex gap-3 items-center">
                <Input
                  placeholder="Cari Kontak..."
                  className="rounded-full"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <div className="sm:hidden">
                  <SwitchDarkMode />
                </div>
                <div className="sm:hidden">
                  <DropDown />
                </div>
              </div>
            </div>
            {listContacts.length > 0 ? (
              <UserLists
                setSelectedUser={setSelectedUser}
                contacts={listContacts?.filter((contactFilter) => {
                  const filterById = contactFilter._id !== user._id;
                  const filterByName = contactFilter.name
                    ?.toLowerCase()
                    ?.includes(searchTerm?.toLowerCase());
                  return filterById && filterByName;
                })}
              />
            ) : (
              <h1 className="text-center pt-5">Kontak tidak ditemukan</h1>
            )}
          </div>
          <div
            className={`col-span-2 h-fit min-h-full sm:mt-0 max-h-screen relative ${
              !selectedUser
                ? 'sm:scale-100 scale-0 transition-all sm:translate-y-0 -translate-y-96'
                : '-translate-y-full sm:translate-y-0 transition-all origin-center'
            }`}
          >
            <Navbar />
            {selectedUser && (
              <ChatBody user={user} selectedUser={selectedUser} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
