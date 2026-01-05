import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AddItems from './components/AddItems/AddItems';
import Orders from './components/Orders/Orders';
import ListItems from './components/ListItems/ListItems';
import AdminLogin from './components/Login/login';
import AdminProtectedRoute from './components/AdminProtectedRoute';
function App() {
  return (
    <Routes>
      {/* ADMIN LOGIN */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <AdminProtectedRoute>
            <AddItems />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/list"
        element={
          <AdminProtectedRoute>
            <ListItems />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
