import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const OpenRoutes = () => {
  const location = useLocation();

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") setIsFooterVisible(true);
    else setIsFooterVisible(false);
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>

      {isFooterVisible ? (
        <div
          className="relative bg-[#fafafb] lg:h-[400px] h-[500px] z-10"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <div className="relative lg:h-[calc(100vh+400px)] h-[calc(100vh+500px)] -top-[100vh]">
            <div className="sticky lg:top-[calc(100vh-400px)] top-[calc(100vh-500px)] lg:h-[400px] h-[500px]">
              <div className="max-w-7xl mx-auto">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default OpenRoutes;
