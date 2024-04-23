import { create } from 'zustand';
import { api } from '@/utils/axios';
import { cookies } from '@/utils/cookies';

export const useUserStore = create((set) => ({
  listUsers: [],
  selectedUser: null,
  listContacts: [],
  selectedContact: null,
  user: null,
  isPreload: false,
  errorMessages: null,
  setNewContact: async (id) => {
    try {
      const response = await api.post('/contact/add', { id });
      const {
        data: { contacts },
      } = await api.get('/contact/lists');
      set({ listContacts: contacts });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setSelectedContact: (data) => set({ selectedContact: data }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  removeSelectedUser: () => set({ selectedUser: null }),
  updateUser: async (data) => {
    if (typeof data.profilePicture === 'object') {
      set({ errorMessages: 'Oopss ada yang salah' });
      return;
    }
    try {
      const {
        status,
        data: { message, updatedUser },
      } = await api.put('/user/update', data);

      if (status === 200) set({ user: updatedUser });

      return { message, status };
    } catch (error) {
      if (error?.response?.data.message) {
        set({ errorMessages: error.response.data.errors });
      }
    }
  },
  getUsers: async () => {
    try {
      set({ isPreload: true });
      const {
        data: { users },
      } = await api.get('/user/lists');
      const {
        data: { contacts },
      } = await api.get('/contact/lists');
      set({ listUsers: users });
      set({ listContacts: contacts });
    } catch (error) {
      console.log(error.message);
      set({ isPreload: false });
    }
  },
  setAuthUser: async (data) => {
    try {
      set({ isPreload: true });
      const {
        data: { token, user },
      } = await api.post('/auth/login', data);
      cookies.set('token', token);
      set({ user });
    } catch (error) {
      console.error(error.response.data.message);
      set({ isPreload: false, errorMessages: error.response.data.message });
    } finally {
      set({ isPreload: false });
    }
  },
  setNewUser: async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  preloadProcess: async () => {
    try {
      set({ isPreload: true });
      const {
        data: { user },
      } = await api.get('/user/me');
      set({ user });
    } catch (error) {
      console.log(error);
      set({ user: null });
    } finally {
      set({ isPreload: false });
    }
  },
  logout: () => {
    cookies.remove('token');
    set({
      user: null,
      selectedUser: null,
      listUsers: [],
      listContacts: [],
    });
  },
}));
