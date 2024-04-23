import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddContactForm from './forms/AddContactForm';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Plus } from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function DropDown() {
  const { user, logout, removeSelectedUser, listUsers } = useUserStore();
  const navigate = useNavigate();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-7 md:me-[5.5rem]">
          <DropdownMenuLabel
            onClick={() => {
              removeSelectedUser();
              navigate('/update-profile');
            }}
            className="flex items-center gap-x-4 gap-y-2 cursor-pointer max-w-[16rem] flex-wrap"
          >
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{user?.name}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="relative w-full font-normal gap-2 justify-start flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
              >
                <Plus size={18} /> Tambah kontak
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah kontak baru</DialogTitle>
                <DialogDescription>
                  Cari pengguna yang ingin ditambahkan ke kontak
                </DialogDescription>
              </DialogHeader>
              <AddContactForm user={user} users={listUsers} />
              <DialogFooter className="sm:justify-start"></DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 text-red-500 "
            onClick={logout}
          >
            <LogOut size={18} />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
