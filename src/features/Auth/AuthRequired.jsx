import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '..';

export function AuthRequired({ admin, children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: pathname } });
    }

    if (admin && !user.isAdmin) {
      toast.error('You are not allowed to view that section!');
      navigate('/');
    }
  }, [user, navigate, pathname, admin]);

  return (
    <>
      {children}
      <Outlet />
    </>
  );
}
