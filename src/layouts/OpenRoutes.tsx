import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const OpenRoutes = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OpenRoutes;
