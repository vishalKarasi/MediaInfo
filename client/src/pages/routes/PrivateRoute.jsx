import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { accessToken, status } = useSelector((state) => state.auth);
  const notAuth = !accessToken && status === "error";
  return notAuth ? <Navigate to="/auth" /> : <Outlet />;
};

export default PrivateRoute;
