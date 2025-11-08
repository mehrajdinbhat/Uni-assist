import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.model.js";

export const isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token)
      return res.status(401).json({ message: "Not authenticated as admin" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = await Admin.findById(decoded.id);

    if (!req.admin) return res.status(404).json({ message: "Admin not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
