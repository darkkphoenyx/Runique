import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

const FooterEffectWrapper = () => {
  return (
    <div>
      <Outlet />
      <div
        className="relative bg-[#fafafb] lg:h-[400px] h-[500px] z-10"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative lg:h-[calc(100vh+400px)] h-[calc(100vh+500px)] -top-[100vh]">
          <div className="sticky lg:top-[calc(100vh-400px)] top-[calc(100vh-500px)] lg:h-[400px] h-[500px]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterEffectWrapper;
