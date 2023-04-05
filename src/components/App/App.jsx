import React from 'react';
import { Counter } from '../../features/Counter/Counter';

export function App() {
  return <Counter initialCount={3} initialStep={2} />;
}

// React.createElement(Counter, {initialCount: '3', initalStep: '2'}, null);
