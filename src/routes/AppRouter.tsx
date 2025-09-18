import NotFound from "@/components/openRoutes/NotFound";
import OpenRoutes from "@/layouts/OpenRoutes";
import ScrollWrapper from "@/layouts/ScrollWrapper";
import CollectionWrapper from "@/pages/Collection/CollectionsWrapper";

import Homepage from "@/pages/Homepage";
import ProductDetailWrapper from "@/pages/ProductDetails/ProductDetailWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        {/* open routes */}
        <Routes>
          <Route element={<OpenRoutes />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<CollectionWrapper />} />
            {/* scroll to top wrapper */}
            <Route element={<ScrollWrapper />}>
              <Route path="/p/:title" element={<ProductDetailWrapper />} />
            </Route>
          </Route>
          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
