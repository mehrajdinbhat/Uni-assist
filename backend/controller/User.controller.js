import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import createTokenAndSaveCookies from "../jwt/atuthToken.js";

// // Cloudinary config
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, education, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !education || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Upload photo to Cloudinary
    // Upload photo to Cloudinary
    let photoData = null;
    if (req.files && req.files.photo) {
      // <-- change here
      const result = await cloudinary.v2.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "uni-assist-users",
        }
      );

      photoData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      return res.status(400).json({ message: "Profile photo is required!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      education,
      password: hashedPassword,
      photo: photoData,
    });

    await newUser.save();
    const token=await createTokenAndSaveCookies(newUser._id,res);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        education: newUser.education,
        photo: newUser.photo,
      },token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user
const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success
    const token=await createTokenAndSaveCookies(user._id,res)
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        education: user.education,
        photo: user.photo,
      },token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = (req, res) => {
  const token = req.cookies?.jwt;

  // If no token found → user already logged out
  if (!token) {
    return res.status(400).json({ message: "User already logged out" });
  }

  // Otherwise, clear the cookie and confirm logout
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true, // set to true if using https
  });

  return res.status(200).json({ message: "User logged out successfully" });
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json(user);
};

