import express from "express";
import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  deleteMaterial,
  searchMaterials,
  incrementDownload,
} from "../controller/material.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// Upload PDF + thumbnail (uses base64 or file URL)
router.post("/materials", isAuthenticated, createMaterial);

// Get all materials
router.get("/materials", getAllMaterials);

// Get single material
router.get("/materials/:id", getMaterialById);

// Delete material
router.delete("/materials/:id", isAuthenticated, deleteMaterial);

// Search materials
router.get("/materials/search", searchMaterials);

// Increment download counter
router.patch("/materials/:id/download", incrementDownload);

export default router;
