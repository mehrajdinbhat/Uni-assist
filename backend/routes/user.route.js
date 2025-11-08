import express from "express";
import { getMyProfile, loginUser, logout, registerUser } from "../controller/User.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",isAuthenticated,logout)
router.get("/myprofile", isAuthenticated, getMyProfile);


export default router;
