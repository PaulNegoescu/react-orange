import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

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
      </menu>
    </nav>
  );
}
