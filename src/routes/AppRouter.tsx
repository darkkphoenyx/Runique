import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterEffectWrapper from "@/layouts/FooterEffectWrapper";
import { ROUTES } from "./ROUTES";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About/About";
import ScrollWrapper from "@/layouts/ScrollWrapper";
import CollectionWrapper from "@/pages/Collection/CollectionsWrapper";
import ProductDetailWrapper from "@/pages/ProductDetails/ProductDetailWrapper";
import UserProtectedRoute from "@/layouts/UserProtectedRoutes";
import ProfileDetails from "@/shared/login/ProfileDetails";
import Bag from "@/pages/Bag/Bag";
import Favourite from "@/pages/Favourite/Favourite";
import AdminProtectedRoute from "@/layouts/AdminProtectedRoutes";
import { Login } from "@/shared/login/Login";
import NotFound from "@/components/openRoutes/NotFound";
import Products from "@/pages/Admin/Products/Products";
import AddProduct from "@/pages/Admin/Products/AddProduct";
import Profile from "@/pages/Admin/Profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN WEBSITE ROUTES */}
        <Route element={<MainLayout />}>
          {/* Open routes with effects */}
          <Route element={<FooterEffectWrapper />}>
            <Route path={ROUTES.ROOT.HOME} element={<Homepage />} />
          </Route>
          <Route element={<ScrollWrapper />}>
            <Route path={ROUTES.USER.ABOUT} element={<About />} />
            <Route path={ROUTES.USER.SHOP} element={<CollectionWrapper />} />
            <Route
              path={ROUTES.USER.dPRODUCT}
              element={<ProductDetailWrapper />}
            />
          </Route>

          {/* Protected routes - user */}
          <Route element={<UserProtectedRoute />}>
            <Route path={ROUTES.ROOT.PROFILE} element={<ProfileDetails />} />
            <Route path={ROUTES.USER.CART} element={<Bag />} />
            <Route path={ROUTES.USER.FAVOURITE} element={<Favourite />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminLayout />}>
          <Route element={<AdminProtectedRoute />}>
            <Route path={ROUTES.ADMIN.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.ADMIN.ADD_PRODUCTS} element={<AddProduct />} />
            <Route path={ROUTES.ADMIN.PROFILE} element={<Profile />} />
          </Route>
        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
