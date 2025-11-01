// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { USERS_KEY } from "../lib/auth";

export default function PrivateRoute({ children }:any) {
  const user = localStorage.getItem(USERS_KEY); // or use your auth context

  return user ? children : <Navigate to="/auth" replace />;
}
