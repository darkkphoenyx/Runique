import ScrollToTopOnRouteChange from "@/shared/ScrollToTopOnRouteChange";
import { Outlet } from "react-router-dom";

const ScrollWrapper = () => {
  return (
    <div>
      <ScrollToTopOnRouteChange />
      <Outlet />
    </div>
  );
};

export default ScrollWrapper;
