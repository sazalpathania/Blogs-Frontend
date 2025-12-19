import { Outlet } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import Footer from "../../components/footer/footer.component.jsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main" style={{ padding: "20px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
