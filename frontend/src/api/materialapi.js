// src/api/materialApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/api/materials",
  withCredentials: true,
});

// Upload Material
export const uploadMaterial = (formData) =>
  API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Get All Materials
export const getAllMaterials = () => API.get("/");

// Delete Material (if admin/uploader)
export const deleteMaterial = (id) => API.delete(`/${id}`);
