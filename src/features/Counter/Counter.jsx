import { useReducer, useState } from 'react';
import clsx from 'clsx';

import styles from './Counter.module.css';

function countReducer(oldState, action) {
  let newState = oldState;

  switch (action.type) {
    case 'increment':
      newState += action.payload;
      break;
    case 'decrement':
      newState -= action.payload;
      break;
    case 'reset':
      newState = action.payload;
      break;
    default:
      console.warn(
        `The action type "${action.type}" is not defined in counterReducer.`
      );
  }

  return newState;
}

export function Counter({ initialCount = 0, initialStep = 1 }) {
  const [count, dispatch] = useReducer(countReducer, initialCount);
  const [step, setStep] = useState(initialStep);

  function handleInputChange(e) {
    setStep(e.target.valueAsNumber);
  }

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output
          className={clsx(styles.output, {
            [styles.positive]: count > 0,
            [styles.negative]: count < 0,
          })}
        >
          {count}
        </output>
      </p>
      <form>
        <label htmlFor="step">Step</label>{' '}
        <input
          type="number"
          name="step"
          id="step"
          value={step}
          onChange={handleInputChange}
        />
      </form>
      <p>
        <button onClick={() => dispatch({ type: 'decrement', payload: step })}>
          -
        </button>
        <button
          onClick={() => dispatch({ type: 'reset', payload: initialCount })}
        >
          Reset
        </button>
        <button onClick={() => dispatch({ type: 'increment', payload: step })}>
          +
        </button>
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
