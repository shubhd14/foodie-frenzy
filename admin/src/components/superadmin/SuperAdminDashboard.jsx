import React from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("superAdminToken");
    navigate("/superadmin/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Super Admin Dashboard</h1>

      <button
        onClick={() => navigate("/superadmin/create-restaurant")}
        className="bg-blue-500 text-white px-4 py-2 mr-4"
      >
        Create Restaurant
      </button>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
};

export default SuperAdminDashboard;
