import { NavLink } from 'react-router-dom';
import { useAuth } from '..';
import { AdminRoutes } from './AdminRoutes';

export function AdminLayout() {
  const { logout } = useAuth();
  return (
    <>
      <nav>
        <menu>
          <li>
            <NavLink to="dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="users">Users</NavLink>
          </li>
          <li>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </li>
        </menu>
      </nav>
      <AdminRoutes />
    </>
  );
}
