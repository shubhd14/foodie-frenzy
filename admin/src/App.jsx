import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AddItems from './components/AddItems/AddItems';
import Orders from './components/Orders/Orders';
import ListItems from './components/ListItems/ListItems';
import AdminLogin from './components/Login/login';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// ✅ SUPER ADMIN IMPORTS
import SuperAdminLogin from './components/superadmin/SuperAdminLogin';
import SuperAdminDashboard from './components/superadmin/SuperAdminDashboard';
import CreateRestaurant from './components/superadmin/CreateRestaurant';

function App() {
  return (
    <Routes>

      {/* ================= SUPER ADMIN ================= */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      <Route
        path="/superadmin/create-restaurant"
        element={<CreateRestaurant />}
      />

      {/* ================= RESTAURANT ADMIN ================= */}
      <Route path="/login" element={<AdminLogin />} />

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
