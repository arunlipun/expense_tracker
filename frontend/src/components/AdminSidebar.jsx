


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
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-4 text-white shadow-sm">
        <h2 className="text-lg font-semibold tracking-wide">Admin Panel</h2>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-2xl transition hover:bg-white/10"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-200 px-5 py-5">
          <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your data</p>
        </div>

        <ul className="flex flex-col p-3">
          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="mb-1 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/expenses"
            onClick={() => setOpen(false)}
            className="mb-1 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Expenses
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setOpen(false)}
            className="mb-1 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Users
          </Link>

          <Link
            to="/admin/reports"
            onClick={() => setOpen(false)}
            className="mb-1 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Reports
          </Link>

          <button
            onClick={logout}
            className="mt-4 rounded-lg bg-red-500 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-red-600"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;