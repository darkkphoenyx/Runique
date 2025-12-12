import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import Aos from "aos";
import "aos/dist/aos.css";
import { Toaster } from "./components/ui/sonner";
// import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}

export default App;
