import React from "react";
import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { selectIsAuthenticated } from "../store/auth-slice";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  
  const isAuthenticated=useSelector(selectIsAuthenticated);
  const location = useLocation();
  useEffect(() => {
    const skipRedirect=sessionStorage.getItem("skipRedirectPath")==="true";
    if (!isAuthenticated && location.pathname !== "/login" && !skipRedirect) {
      sessionStorage.setItem("redirectPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
