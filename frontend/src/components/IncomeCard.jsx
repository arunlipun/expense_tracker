import React from 'react'
import { createIncome } from "../api/incomeApi";

import { useState } from "react";
import { toast } from 'react-toastify';

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

    const response =
      await createIncome(payload);

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
    <div className="bg-white p-6 rounded shadow">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Income Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Salary / Freelance"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Income
        </button>

      </form>

    </div>
  );
};

export default IncomeCard;
