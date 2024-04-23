/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Plus } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const addContactSchema = z
  .object({
    selectedContactId: z.string(),
  })
  .required();

export default function AddContactForm({ user, users }) {
  const { selectedContact, setSelectedContact, setNewContact, listContacts } =
    useUserStore();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addContactSchema),
  });
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const usersNotInContacts = users?.filter(
    (userItem) =>
      userItem.email !== user.email &&
      !listContacts.some((contact) => contact.email === userItem.email)
  );
  const tesCUy = async (data) => {
    const response = await setNewContact(data.selectedContactId);
    if (response.status === 201) {
      setSelectedContact(null);
      setValue('selectedContactId', null);
      toast(response?.data?.message, {
        position: 'top-center',
        style: {
          background: 'green',
        },
        action: {
          label: 'X',
          onClick: () => {},
        },
      });
    }
  };

  if (errors?.selectedContactId?.message) {
    toast('Kontak harus diisi!', {
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
    <Form>
      <form
        className="flex items-center space-x-2"
        onSubmit={handleSubmit(tesCUy)}
      >
        {isDesktop ? (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {selectedContact ? (
                    <>{selectedContact.label}</>
                  ) : (
                    <>Pilih Pengguna</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="min-w-[22rem] max-w-xs w-full p-0"
                align="center"
              >
                <ContactLists
                  setOpen={setOpen}
                  setValue={setValue}
                  setSelectedContact={setSelectedContact}
                  usersNotInContacts={usersNotInContacts}
                />
              </PopoverContent>
            </Popover>
            <Button
              disabled={isSubmitting}
              type="submit"
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Tambah</span>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </>
        ) : (
          <>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {selectedContact ? (
                    <>{selectedContact.label}</>
                  ) : (
                    <>Pilih Pengguna</>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mt-4 border-t">
                  <ContactLists
                    setOpen={setOpen}
                    setValue={setValue}
                    setSelectedContact={setSelectedContact}
                    usersNotInContacts={usersNotInContacts}
                  />
                </div>
              </DrawerContent>
            </Drawer>
            <Button
              disabled={isSubmitting}
              type="submit"
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Tambah</span>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}

function ContactLists({
  setSelectedContact,
  usersNotInContacts,
  setValue,
  setOpen,
}) {
  return (
    <Command>
      <CommandInput placeholder="Cari pengguna..." />
      <CommandList>
        <CommandEmpty>Pengguna tidak ditemukan.</CommandEmpty>
        <CommandGroup className="max-h-44 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-slate-300 dark:scrollbar-track-slate-800 overflow-y-auto">
          {usersNotInContacts
            ?.sort((a, b) => a.name.localeCompare(b.name))
            ?.map((user) => (
              <CommandItem
                key={user._id}
                value={user._id}
                onSelect={() => {
                  setSelectedContact({ value: user._id, label: user.name });
                  setValue('selectedContactId', user._id);
                  setOpen(false);
                }}
              >
                {user.name} - {user.email}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
