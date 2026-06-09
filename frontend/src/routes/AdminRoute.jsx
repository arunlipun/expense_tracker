// src/routes/AdminRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {

  const token =
    localStorage.getItem("accessToken");

  const roles =
    JSON.parse(localStorage.getItem("roles"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return roles.includes("ROLE_ADMIN")
    ? <Outlet />
    : <Navigate to="/dashboard" />;
};

export default AdminRoute;