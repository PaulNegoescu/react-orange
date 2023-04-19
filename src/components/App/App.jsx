import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Counter, Todos, Weather, NotFound, FilmList } from '~/features';
import { Nav } from '~/components';

import './App.css';

export function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="todos" element={<Todos />} />
        <Route path="weather" element={<Weather />} />
        <Route
          path="counter"
          element={<Counter initialCount={3} initialStep={2} />}
        />
        <Route path="films" element={<FilmList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// React.createElement(Counter, {initialCount: '3', initalStep: '2'}, null);
