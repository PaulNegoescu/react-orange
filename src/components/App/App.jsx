import React from 'react';
import { Counter, Todos, Weather } from '~/features';

export function App() {
  return (
    <>
      <Todos />
      {/* <Weather />
      <Counter initialCount={3} initialStep={2} /> */}
    </>
  );
}

// React.createElement(Counter, {initialCount: '3', initalStep: '2'}, null);
