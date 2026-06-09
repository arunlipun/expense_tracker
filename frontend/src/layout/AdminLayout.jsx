// import { Outlet }
// from "react-router-dom";

// import AdminSidebar
// from "../components/AdminSidebar";

// const AdminLayout = () => {

//   return (
//     <div className="flex">

//       <AdminSidebar />

//       <div className="flex-1 p-5">
//         <Outlet />
//       </div>

//     </div>
//   );
// };

// export default AdminLayout;







import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">

      <AdminSidebar />

      <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;