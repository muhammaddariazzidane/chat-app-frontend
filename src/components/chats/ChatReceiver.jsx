/* eslint-disable react/prop-types */
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { FaFilePdf } from 'react-icons/fa6';
import { getFileExtension } from '@/utils/getFileExtension';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

export default function ChatReceiver({ chat }) {
  const { user } = useUserStore();
  return (
    <div className="flex justify-start">
      <div>
        <div className="flex flex-row-reverse w-full items-end p-2 gap-2 mb-2">
          <ContextMenu>
            <ContextMenuTrigger className="py-2 px-1.5 sm:p-2 bg-gray-700 rounded-lg rounded-bl-none ">
              {chat?.file &&
                (() => {
                  const extensionName = getFileExtension(chat?.file);
                  if (
                    extensionName === 'jpg' ||
                    extensionName === 'png' ||
                    extensionName === 'jpeg'
                  ) {
                    return (
                      <div className="rounded py-1">
                        <img
                          src={chat.file}
                          alt="media images"
                          className="rounded w-full h-full object-contain"
                        />
                      </div>
                    );
                  } else if (extensionName === 'pdf') {
                    return (
                      <div className="rounded py-1">
                        <Link to={chat.file} target="_blank">
                          <Button
                            variant="destructive"
                            className="text-xs underline flex flex-wrap gap-2"
                          >
                            <FaFilePdf size={17} />
                            <p className="sm:block hidden">
                              {chat.file.split('/').pop().split('?')[0]}
                            </p>
                          </Button>
                        </Link>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })()}
              <div className="flex lg:flex-nowrap  justify-end items-center  flex-wrap sm:gap-4 gap-1">
                <h2 className="text-white text-sm font-normal leading-relaxed">
                  {chat.message}
                </h2>
                <small className="text-gray-300 text-xs font-normal leading-4 sm:pt-1.5">
                  {new Date(chat.createdAt).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </div>

              {chat.sender._id === user._id && (
                <ContextMenuContent>
                  <ContextMenuItem>Hapus</ContextMenuItem>
                </ContextMenuContent>
              )}
            </ContextMenuTrigger>
          </ContextMenu>
          <Avatar className="sm:block hidden">
            <AvatarImage src={chat.sender.profilePicture} />
            <AvatarFallback className="uppercase">
              {chat.sender.name.substr(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
