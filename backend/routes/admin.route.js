import express from "express";
import { isAdminAuthenticated } from "../middleware/authAdmin.js";
import {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controller/Admin.controller.js";

import {
  getAllRequests,
  updateRequestStatus,
} from "../controller/guesthouse.controller.js";

const router = express.Router();

// ===== Admin Authentication Routes =====
router.post("/register", registerAdmin); // Run only once manually
router.post("/login", loginAdmin);
router.get("/logout", isAdminAuthenticated, logoutAdmin);

// ===== Admin Guest House Management =====
router.get("/requests", isAdminAuthenticated, getAllRequests);
router.put("/requests/:id/status", isAdminAuthenticated, updateRequestStatus);

export default router;
