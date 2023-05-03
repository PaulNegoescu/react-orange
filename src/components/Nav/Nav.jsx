import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import styles from './Nav.module.css';
import { useAuth } from '~/features';

function BrandNavLink({ children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => clsx({ [styles.active]: isActive })}
    >
      {children}
    </NavLink>
  );
}

// React.createElement(NavLink, {...props, className=() => {}}, children)

export function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.mainNav}>
      <Link to="/" className={styles.logo}>
        React Orange
      </Link>
      <menu>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">Counter</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="weather">Weather</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="todos">Todos</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="films">Films</BrandNavLink>
        </li>

        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="register">Register</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="login">Login</BrandNavLink>
            </li>
          </>
        )}
        {user && (
          <li className={styles.pushRight}>
            Hello {user.firstName}!
            <a
              href="/logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          </li>
        )}
      </menu>
    </nav>
  );
}
