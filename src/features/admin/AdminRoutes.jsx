import { Navigate, Route, Routes } from 'react-router-dom';

export function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<h1>Dashboard</h1>} />
      <Route path="users" element={<h1>Users</h1>} />
    </Routes>
  );
}
