import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const location = useLocation();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("isLogin") || "false");
    const admin = JSON.parse(localStorage.getItem("isAdmin") || "false");
    setIsLogin(login);
    setIsAdmin(admin);
  }, []);

  if (isLogin === null) return null;

  return isLogin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
};

export default ProtectedRoutes;
