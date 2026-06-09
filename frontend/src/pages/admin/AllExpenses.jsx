import React from 'react'

import { useEffect, useState } from "react";
import {
  getAllExpenses,
  deleteExpense,
} from "../../api/adminApi";

const AllExpenses = () => {

  const [expenses, setExpenses] =
    useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const res =
      await getAllExpenses();

    setExpenses(res.data.data);
  };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Expense?"
        )
      )
        return;

      await deleteExpense(id);

      loadExpenses();
    };

  return (
    // <div className="p-5">

    //   <h1 className="text-3xl mb-4">
    //     All Expenses
    //   </h1>

    //   <table className="w-full border">

    //     <thead>
    //       <tr>
    //         <th>Title</th>
    //         <th>Amount</th>
    //         <th>Category</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>

    //     <tbody>

    //       {expenses.map((expense) => (
    //         <tr key={expense.id}>
    //           <td>{expense.title}</td>
    //           <td>{expense.amount}</td>
    //           <td>{expense.category}</td>

    //           <td>
    //             <button
    //               onClick={() =>
    //                 handleDelete(
    //                   expense.id
    //                 )
    //               }
    //               className="bg-red-500 text-white px-3 py-1"
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}

    //     </tbody>

    //   </table>

    // </div>

    <div className="overflow-x-auto bg-white rounded shadow">

  <table className="min-w-full border border-gray-200">

    <thead className="bg-gray-100">

      <tr>

        <th className="p-3 border text-left">
          Title
        </th>

        <th className="p-3 border text-left">
          Amount
        </th>

        <th className="p-3 border text-left">
          Category
        </th>

        <th className="p-3 border text-center">
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {expenses.map((expense) => (

        <tr
          key={expense.id}
          className="hover:bg-gray-50"
        >

          <td className="p-3 border">
            {expense.title}
          </td>

          <td className="p-3 border">
            ₹ {expense.amount}
          </td>

          <td className="p-3 border">
            {expense.category}
          </td>

          <td className="p-3 border text-center">

            <button
              onClick={() =>
                handleDelete(expense.id)
              }
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-3 py-1
                rounded
              "
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
  );
};

export default AllExpenses;
