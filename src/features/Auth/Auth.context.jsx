import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorageState } from '~/hooks';

const AuthContext = createContext(null);
const initialAuth = {
  accessToken: null,
  user: null,
};
const storageKey = 'auth';

export function getAccessToken() {
  return JSON.parse(window?.localStorage.getItem(storageKey)).accessToken;
}

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useLocalStorageState(storageKey, initialAuth);

  const logout = useCallback(() => {
    setAuth(initialAuth);
  }, [setAuth]);

  const value = useMemo(
    () => ({ ...auth, login: setAuth, logout }),
    [auth, logout, setAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      'The useAuth hook needs to be used in a component that is a descendent of AuthContextProvider!'
    );
  }

  return ctx;
}
