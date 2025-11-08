import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the note/book/paper
  description: { type: String }, // Short info or summary
  subject: { type: String, required: true }, // e.g., Physics, Programming, etc.
  category: {
    type: String,
    enum: ["Notes", "Book", "Question Paper", "Research Paper", "Other"],
    default: "Notes",
  },
  tags: [{ type: String }], // for better search/filtering
  file: {
    public_id: { type: String, required: true }, // Cloudinary or similar ID
    url: { type: String, required: true }, // Direct file link (PDF)
    size: { type: Number }, // in bytes
    type: { type: String, default: "application/pdf" },
  },
  thumbnail: {
    public_id: { type: String },
    url: { type: String },
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Material = mongoose.model("Material", materialSchema);
