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
  AuthForms,
  AuthContextProvider,
  AuthRequired,
} from '~/features';
import { Nav } from '~/components';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { GenericLayout } from '~/features/GenericLayout';
import { AdminLayout } from '~/features/admin/AdminLayout';

export function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<GenericLayout />}>
            <Route index element={<h1>Homepage</h1>} />
            <Route path="todos" element={<Todos />} />
            <Route path="weather" element={<Weather />} />
            <Route
              path="counter"
              element={<Counter initialCount={3} initialStep={2} />}
            />
            <Route path="films" element={<FilmList />} />
            <Route path="films/:filmId" element={<FilmDetails />} />

            <Route element={<AuthRequired />}>
              <Route path="films/:filmId/edit" element={<EditFilm />} />
              <Route path="films/add" element={<AddFilm />} />
            </Route>
            <Route path="register" element={<AuthForms />} />
            <Route path="login" element={<AuthForms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              <AuthRequired admin>
                <AdminLayout />
              </AuthRequired>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

// React.createElement(Counter, {initialCount: '3', initalStep: '2'}, null);
