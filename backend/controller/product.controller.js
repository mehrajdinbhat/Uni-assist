import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body; // remove seller from here
    const seller = req.user._id; // automatically get seller from token

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
      seller, // now this is taken from req.user
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
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate("seller", "name email"); // 👈 add this

    res.status(200).json({ products });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// single product


export const getOneProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    // Populate seller to get name and phone
    const product = await Product.findById(id).populate(
      "seller",
      "name phone email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// delete product
export const deleteProduct=async(req,res)=>{
  const {id}=req.params;
  const product=await Product.findById(id);
  if(!product){
    return res.status(404).json({message:"product not found"})
  }
  await product.deleteOne();
  res.status(200).json({message:"product deleted succesfully"})
}

// get my_products

export const getMyProducts = async (req, res) => {
  try {
    const seller = req.user._id;

    const myproducts = await Product.find({ seller }).populate(
      "seller",
      "name email"
    );

    // 🔍 Check if user has no products
    if (myproducts.length === 0) {
      return res.status(404).json({
        message: "You have not created any product yet"
      });
    }

    // ✅ If products exist
    res.status(200).json({
      success: true,
      count: myproducts.length,
      products: myproducts,
    });
  } catch (error) {
    console.error("Error fetching your products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching your products",
    });
  }
};

// update product
export const updateProduct=async(req,res)=>{
  console.log("req.body:", req.body);

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product= await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    let productImageData = product.images; // keep old image by default

    // If new image is uploaded
    if (req.files && req.files.images) {
      const { images } = req.files;

      const allowedformat = /jpg|jpeg|png/;
      if (!allowedformat.test(images.mimetype)) {
        return res
          .status(400)
          .json({ message: "please upload jpg|jpeg|png format" });
      }

      // delete old image from cloudinary
      if (product.images && product.images.public_id) {
        await cloudinary.uploader.destroy(product.images.public_id);
      }

      // upload new one
      const cloudinaryResponse = await cloudinary.uploader.upload(
        images.tempFilePath
      );

      productImageData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    // update fields
    const { name,description,category, about,price,seller, } = req.body
    product.name=name || product.name
    product.description=description || product.description
    product.category = category || product.category;
    product.about = about || product.about;
    product.price=price || product.price;
    product.seller=seller || product.seller;
    product.images = productImageData;

    const updateProduct= await product.save();

    res.status(200).json({
      message: "product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}