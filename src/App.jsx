import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import UpdateProfile from './pages/UpdateProfile';
import NotFound from './pages/errors/NotFound';

export default function App() {
  const { user, preloadProcess, isPreload, getUsers } = useUserStore();

  useEffect(() => {
    preloadProcess();
    getUsers();
  }, [getUsers, preloadProcess]);

  if (isPreload) {
    return null;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/:id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
