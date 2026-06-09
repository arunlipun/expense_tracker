import api from "./axios";

export const getUserDashboard = () => {
  return api.get("/user-dashboard");
};

