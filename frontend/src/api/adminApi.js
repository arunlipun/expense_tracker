import api from "./axios";

export const getAdminDashboard = () => {
  return api.get("/admin/dashboard");
};

export const getAllExpenses = () => {
  return api.get("/admin/expenses");
};

export const deleteExpense = (id) => {
  return api.delete(`/admin/expenses/${id}`);
};

export const downloadReport = (type) => {
  return api.get(`/admin/reports/${type}`, {
    responseType: "blob",
  });
};