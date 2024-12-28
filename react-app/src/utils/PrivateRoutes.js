import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const isAuthenticated = localStorage.getItem("access-token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/unauthorized" />;
}

export default PrivateRoutes;
