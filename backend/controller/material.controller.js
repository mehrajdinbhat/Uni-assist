import { Material } from "../models/material.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Upload new material
export const createMaterial = async (req, res) => {
  try {
    const { title, description, subject, category, tags } = req.body;

    // Ensure PDF file exists
    if (!req.files || !req.files.pdfFile) {
      return res
        .status(400)
        .json({ success: false, message: "PDF file is required" });
    }

    // ✅ Upload PDF to Cloudinary (as raw)
    const pdfUpload = await cloudinary.uploader.upload(
      req.files.pdfFile.tempFilePath,
      {
        folder: "UniAssist/materials",
        resource_type: "raw",
      }
    );

    // ✅ Optional thumbnail upload
    let thumbnailUpload = {};
    if (req.files.thumbnail) {
      const thumbResult = await cloudinary.uploader.upload(
        req.files.thumbnail.tempFilePath,
        {
          folder: "UniAssist/thumbnails",
        }
      );
      thumbnailUpload = {
        public_id: thumbResult.public_id,
        url: thumbResult.secure_url,
      };
    }

    // ✅ Create material entry in DB
    const material = await Material.create({
      title,
      description,
      subject,
      category,
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : tags.split(",").map((tag) => tag.trim())
        : [],
      file: {
        public_id: pdfUpload.public_id,
        url: pdfUpload.secure_url,
        size: pdfUpload.bytes,
        type: pdfUpload.format,
      },
      thumbnail: thumbnailUpload,
      uploader: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Material uploaded successfully!",
      material,
    });
  } catch (error) {
    console.error("❌ Error in createMaterial:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all materials
export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate("uploader", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("❌ Error in getAllMaterials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single material (and increase views)
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate(
      "uploader",
      "name email"
    );
    if (!material)
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });

    material.views += 1;
    await material.save();

    res.status(200).json({ success: true, material });
  } catch (error) {
    console.error("❌ Error in getMaterialById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material)
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });

    // ✅ Delete PDF from Cloudinary
    if (material.file && material.file.public_id) {
      await cloudinary.uploader.destroy(material.file.public_id, {
        resource_type: "raw",
      });
    }

    // ✅ Delete thumbnail if it exists
    if (material.thumbnail && material.thumbnail.public_id) {
      await cloudinary.uploader.destroy(material.thumbnail.public_id);
    }

    await material.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Material deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteMaterial:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Search materials by title, subject, or tags
export const searchMaterials = async (req, res) => {
  try {
    const { query } = req.query;
    const materials = await Material.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).populate("uploader", "name");

    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("❌ Error in searchMaterials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Increment download count
export const incrementDownload = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material)
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });

    material.downloads += 1;
    await material.save();

    res.status(200).json({ success: true, message: "Download count updated" });
  } catch (error) {
    console.error("❌ Error in incrementDownload:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
