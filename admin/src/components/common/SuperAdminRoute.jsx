import React from "react";
import { Navigate } from "react-router-dom";

const SuperAdminRoute = ({ children }) => {
  const token = localStorage.getItem("superAdminToken");

  if (!token) {
    return <Navigate to="/superadmin/login" />;
  }

  return children;
};

export default SuperAdminRoute;
