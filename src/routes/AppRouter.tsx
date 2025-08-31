import NotFound from "@/components/openRoutes/NotFound";
import OpenRoutes from "@/layouts/OpenRoutes";
import Homepage from "@/pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        {/* open routes */}
        <Routes>
          <Route element={<OpenRoutes />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
