

import React from "react";
import ExpenseCard from "../../components/ExpenseCard";

const AddExpense = () => {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Add Transaction
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new income or expense transaction
        </p>
      </div>

       <ExpenseCard  />

    </div>
  );
};

export default AddExpense;
