
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createIncome } from "../api/incomeApi";

const IncomeCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
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
        type: "INCOME",
        date: formData.date + "T00:00:00",
      };

      const response = await createIncome(payload);

      console.log(response.data);
      toast.success("Income Added Successfully");

      setFormData({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Income ");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Add Income</h2>
        <p className="mt-1 text-sm text-slate-500">
          Save your income details here
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Income Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <input
          type="text"
          name="category"
          placeholder="Salary / Freelance"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-green-700"
        >
          Save Income
        </button>
      </form>
    </div>
  );
};

export default IncomeCard;
