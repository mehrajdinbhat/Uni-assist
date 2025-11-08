import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    phone: String,
    required: true,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
