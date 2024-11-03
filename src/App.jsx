import { Outlet } from "react-router-dom";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
