import express from "express";
import {
  createGuestHouseRequest,
  getAllRequests,
  updateRequestStatus,
  getUserRequests,
} from "../controller/guesthouse.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// User submits form
router.post("/", isAuthenticated, createGuestHouseRequest);

// // User views their own applications
router.get("/myrequests", isAuthenticated, getUserRequests);

// // Institute/Admin view all requests
router.get("/", isAuthenticated, getAllRequests);

// // Institute/Registrar updates verification status
router.put("/:id/status", isAuthenticated,  updateRequestStatus);

export default router;
