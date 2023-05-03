import { useCallback, useEffect, useState } from 'react';

function updateStorage(key, data) {
  if (data === undefined) {
    window?.localStorage.removeItem(key);
  }
  window?.localStorage.setItem(key, JSON.stringify(data));
}

export function useLocalStorageState(key, initialState) {
  const [state, setState] = useState(() => {
    const fromStorage = window?.localStorage.getItem(key);

    if (fromStorage) {
      return JSON.parse(fromStorage);
    }

    let defaultState = initialState;
    if (typeof initialState === 'function') {
      defaultState = initialState();
    }

    updateStorage(key, defaultState);
    return defaultState;
  });

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === key) {
        console.log('storage hook');
        setState(JSON.parse(e.newValue));
      }
    }
    window?.addEventListener('storage', handleStorage);

    return () => {
      window?.removeEventListener('storage', handleStorage);
    };
  }, [key]);

  const updateState = useCallback(
    (newState) => {
      setState((oldState) => {
        let newValue = newState;
        if (typeof newState === 'function') {
          newValue = newState(oldState);
        }
        updateStorage(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [state, updateState];
}
