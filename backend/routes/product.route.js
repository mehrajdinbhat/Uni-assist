import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getOneProduct,
  updateProduct,
} from "../controller/product.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";


const router = express.Router();
// POST /api/products → create product
router.post("/create",isAuthenticated, createProduct);

// GET /api/products → get all products
router.get("/getallproducts", getAllProducts);

// get one product
router.get("/oneproduct/:id",getOneProduct)

// delete /api/products
router.delete("/delete/:id",isAuthenticated,deleteProduct)

// get my products

router.get("/getmyproducts",isAuthenticated,getMyProducts)
// update route 
router.put("/update/:id",isAuthenticated,updateProduct)

export default router;
