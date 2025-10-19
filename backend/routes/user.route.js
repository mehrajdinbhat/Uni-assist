import express from "express";
import { loginUser, logout, registerUser } from "../controller/User.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",isAuthenticated,logout)

export default router;
