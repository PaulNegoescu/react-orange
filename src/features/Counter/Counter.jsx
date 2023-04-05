import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output>{count}</output>
      </p>
      <p>
        <button onClick={() => setCount((oldState) => oldState - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </p>
    </>
  );
}

let state;
let wasStateSet = false;
function useMyState(initialState) {
  if (!wasStateSet) {
    if (typeof initialState === 'function') {
      state = initialState();
    } else {
      state = initialState;
    }
    wasStateSet = true;
  }

  function setState(newState) {
    if (typeof newState === 'function') {
      state = newState(state);
    } else {
      state = newState;
    }

    Counter();
  }

  return [state, setState];
}
