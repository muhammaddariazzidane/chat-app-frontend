import { storage } from '@/lib/firebase';
import { api } from '@/utils/axios';
import { deleteObject, ref } from 'firebase/storage';
import { create } from 'zustand';

export const useChatStore = create((set) => ({
  chat: null,
  chats: [],
  isPreload: false,
  sendMessage: async (data, id) => {
    try {
      await api.post(`/chat/${id}/send`, data);
      const {
        data: { chats },
      } = await api.get(`/chat/${id}/message`);
      set({ chats });
    } catch (error) {
      console.log(error.response?.data);
    }
  },
  getChats: async (id) => {
    try {
      set({ isPreload: true });
      const {
        data: { chats },
      } = await api.get(`/chat/${id}/message`);
      set({ chats });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isPreload: false });
    }
  },
  removeChat: async (chat) => {
    try {
      if (chat.file) {
        const imgRef = ref(storage, chat.file);
        deleteObject(imgRef)
          .then(async () => {
            await api.delete(`/chat/${chat._id}/delete`);
            const {
              data: { chats },
            } = await api.get(`/chat/${chat.receiver._id}/message`);
            set({ chats });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await api.delete(`/chat/${chat._id}/delete`);
        const {
          data: { chats },
        } = await api.get(`/chat/${chat.receiver._id}/message`);
        set({ chats });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
