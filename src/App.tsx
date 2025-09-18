import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
