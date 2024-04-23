import axios from 'axios';
import { cookies } from '@/utils/cookies';

const token = cookies.get('token');

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
