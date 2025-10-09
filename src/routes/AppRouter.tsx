import NotFound from "@/components/openRoutes/NotFound";
import FooterEffectWrapper from "@/layouts/FooterEffectWrapper";
import OpenRoutes from "@/layouts/OpenRoutes";
import ProtectedRoutes from "@/layouts/ProtectedRoutes";
import ScrollWrapper from "@/layouts/ScrollWrapper";
import Bag from "@/pages/Bag/Bag";
import CollectionWrapper from "@/pages/Collection/CollectionsWrapper";

import Homepage from "@/pages/Homepage";
import { Login } from "@/pages/login/Login";
import ProfileDetails from "@/pages/login/ProfileDetails";
import ProductDetailWrapper from "@/pages/ProductDetails/ProductDetailWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        {/* open routes */}
        <Routes>
          <Route element={<OpenRoutes />}>
            {/* these routes have a footer effect, so separated */}
            <Route element={<FooterEffectWrapper />}>
              <Route path="/" element={<Homepage />} />
            </Route>
            {/* scroll to top wrapper */}
            <Route element={<ScrollWrapper />}>
              <Route path="/shop" element={<CollectionWrapper />} />
              <Route path="/p/:slug" element={<ProductDetailWrapper />} />
            </Route>

            {/* protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfileDetails />} />
              <Route path="/cart" element={<Bag />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
