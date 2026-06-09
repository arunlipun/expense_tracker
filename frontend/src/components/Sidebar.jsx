import React from 'react'

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Add Expense",
      path: "/add-expense",
    },
    {
      name: "Expenses",
      path: "/expenses",
    },
     {
    name: "Add Income",
    path: "/add-income",
  },
   {
    name: "Income",
    path: "/income",
  },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen">
      
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Navigation
        </h2>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              block
              px-4
              py-3
              rounded-lg
              mb-2
              transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
              `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;