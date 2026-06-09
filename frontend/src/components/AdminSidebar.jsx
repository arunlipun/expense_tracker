














import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    toast.success("Logout successfully ");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}

      <div className="md:hidden flex justify-between items-center p-4 bg-slate-800 text-white sticky top-0 z-50">

        <h2 className="font-bold text-lg">
          Admin Panel
        </h2>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-white
          border-r
          shadow-lg
          z-50
          transform
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <h2 className="text-2xl font-bold p-5 border-b">
          Admin Panel
        </h2>

        <ul className="flex flex-col">

          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="p-4 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/expenses"
            onClick={() => setOpen(false)}
            className="p-4 hover:bg-gray-100"
          >
            Expenses
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setOpen(false)}
            className="p-4 hover:bg-gray-100"
          >
            Users
          </Link>

          <Link
            to="/admin/reports"
            onClick={() => setOpen(false)}
            className="p-4 hover:bg-gray-100"
          >
            Reports
          </Link>

          <button
            onClick={logout}
            className="
              m-4
              bg-red-500
              hover:bg-red-600
              text-white
              p-2
              rounded
            "
          >
            Logout
          </button>

        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;