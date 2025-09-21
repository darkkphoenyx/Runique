import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scroll = () => {
      window.scrollTo(0, 0);

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      const custom = document.getElementById("scrollable-content");
      if (custom) {
        custom.scrollTop = 0;
      }
    };
    const timeout = setTimeout(scroll, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
