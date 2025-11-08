import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/api/guesthouse",
  withCredentials: true,
});

// Submit new request
export const submitGuestHouseForm = (formData) =>
  API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Get user’s own requests
export const getUserRequests = () => API.get("/myrequests");

// Get all requests (for admin/institute)
export const getAllRequests = () => API.get("/");

// Update request status (admin/registrar)
export const updateRequestStatus = (id, data) => API.put(`/${id}/status`, data);
