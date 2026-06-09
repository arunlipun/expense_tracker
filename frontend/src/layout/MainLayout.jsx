

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../pages/public/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
          <Footer/>
        </main>

      </div>

    </div>
  );
};

export default MainLayout;