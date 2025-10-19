import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, seller } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    let imagesData = [];
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        imagesData.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      seller,
      images: imagesData,
    });
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
