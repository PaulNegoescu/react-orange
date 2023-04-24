import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Counter,
  Todos,
  Weather,
  NotFound,
  FilmList,
  FilmDetails,
  EditFilm,
  AddFilm,
} from '~/features';
import { Nav } from '~/components';

import 'react-toastify/dist/ReactToastify.css';
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
        <Route path="films/:filmId" element={<FilmDetails />} />
        <Route path="films/:filmId/edit" element={<EditFilm />} />
        <Route path="films/add" element={<AddFilm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

// React.createElement(Counter, {initialCount: '3', initalStep: '2'}, null);
