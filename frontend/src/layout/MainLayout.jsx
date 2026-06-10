



import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../pages/public/Footer";

const MainLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAFAF7" }}>

      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>

        <Sidebar />

        <main style={{ flex: 1, padding: "0", overflowX: "hidden" }}>
          <Outlet />
        </main>

      </div>

      <Footer />

    </div>
  );
};

export default MainLayout;