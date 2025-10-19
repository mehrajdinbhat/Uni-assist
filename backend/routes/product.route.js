import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controller/product.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";


const router = express.Router();
// POST /api/products → create product
router.post("/create",isAuthenticated, createProduct);

// GET /api/products → get all products
router.get("/getallproducts", getAllProducts);

export default router;
