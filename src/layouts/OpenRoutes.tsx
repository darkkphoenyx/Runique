import Navbar from "@/components/openRoutes/Navbar";
import { Outlet } from "react-router-dom";

const OpenRoutes = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default OpenRoutes;
