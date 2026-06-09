import api from "./axios";

export const createExpense = (expenseData) => {
  return api.post("/expenses", expenseData);
};

export const getExpenses = () => {
  return api.get("/expenses");
};

export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};

export const updateExpense = (id,data) => {
  return api.put(`/expenses/${id}`,data);
};