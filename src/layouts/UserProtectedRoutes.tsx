import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserProtectedRoute = () => {
  const location = useLocation();
  const isLogin = JSON.parse(localStorage.getItem("isLogin") || "false");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

  if (!isLogin) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
