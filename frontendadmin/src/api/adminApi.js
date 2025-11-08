import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:4001/api/admin",
  withCredentials: true,
});

export const adminLogin = (data) => ADMIN_API.post("/login", data);
export const getAdminDashboard = () => ADMIN_API.get("/dashboard");
export const adminLogout = () => ADMIN_API.get("/logout");
