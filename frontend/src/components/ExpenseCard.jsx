
import { toast } from "react-toastify";
import { createExpense } from "../api/expenseApi";
import React, { useState } from "react";

const ExpenseCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const payload = {
      ...formData,
      date: formData.date + "T00:00:00",
      type: "EXPENSE",
    };

    await createExpense(payload);

   toast.success("Expense Added");

    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
      type: "EXPENSE",
    });

  } catch (error) {

    console.log(error);

    toast.error("Failed")

  }
};

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Title */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Transaction Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Transaction Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="EXPENSE">
              Expense
            </option>

            <option value="INCOME">
              Income
            </option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Food, Salary, Bills..."
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Optional description..."
            className="
              w-full
              px-4
              py-3
              border
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Save Transaction
        </button>

      </form>
    </div>
  );
};

export default ExpenseCard;
