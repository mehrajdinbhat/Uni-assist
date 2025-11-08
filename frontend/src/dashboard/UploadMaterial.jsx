// src/components/UploadMaterial.jsx
import React, { useState } from "react";
import { uploadMaterial } from "../api/materialApi";
import toast from "react-hot-toast";

export default function UploadMaterial() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    category: "",
    tags: "",
  });
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF file");

    const uploadData = new FormData();
    uploadData.append("pdfFile", file);
    if (thumbnail) uploadData.append("thumbnail", thumbnail);

    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      setLoading(true);
      const { data } = await uploadMaterial(uploadData);
      toast.success("Material uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        subject: "",
        category: "",
        tags: "",
      });
      setFile(null);
      setThumbnail(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">
        📚 Upload Study Material
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title (e.g. Data Structures Notes)"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="subject"
          placeholder="Subject (e.g. Computer Science)"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          placeholder="Category (Notes / Books / Papers)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label className="block font-medium mt-2">Select PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label className="block font-medium mt-2">
          Select Thumbnail (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Material"}
        </button>
      </form>
    </div>
  );
}
