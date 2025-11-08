import { Admin } from "../models/Admin.model.js";
import jwt from "jsonwebtoken";

// Register admin (You can use this manually to create institute or registrar)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    admin = await Admin.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = admin.generateToken();
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Admin logged in successfully",
        admin: { name: admin.name, role: admin.role, email: admin.email },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout admin
export const logoutAdmin = (req, res) => {
  res.cookie("adminToken", "", { expires: new Date(0) });
  res.status(200).json({ success: true, message: "Admin logged out" });
};
