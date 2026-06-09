// src/routes/UserRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {

  const token =
    localStorage.getItem("accessToken");

  return token
    ? <Outlet />
    : <Navigate to="/login" />;
};

export default UserRoute;