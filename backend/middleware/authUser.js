import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Authentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("middleware :", token);
    if (!token) {
      return res.status(401).json({ error: "User is  not autheticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error occuring in Authentication :" + error);
    return res.status(401).json({ error: "user is not authenticated" });
  }
};
