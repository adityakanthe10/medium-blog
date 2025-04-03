import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isAuthenticated =
    !!localStorage.getItem("token") || !!localStorage.getItem("user");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
