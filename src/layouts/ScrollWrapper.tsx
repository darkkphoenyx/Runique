import Footer from "@/components/footer/Footer";
import ScrollToTopOnRouteChange from "@/shared/ScrollToTopOnRouteChange";
import { Outlet } from "react-router-dom";

const ScrollWrapper = () => {
  return (
    <div>
      <ScrollToTopOnRouteChange />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ScrollWrapper;
