// src/components/Materials.jsx
import React, { useEffect, useState } from "react";
import { getAllMaterials, deleteMaterial } from "../api/materialapi.js";
import toast from "react-hot-toast";

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      const { data } = await getAllMaterials();
      setMaterials(data.materials || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?"))
      return;
    try {
      await deleteMaterial(id);
      toast.success("Material deleted");
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading materials...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        📖 All Study Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-gray-600">No materials uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={
                  mat.thumbnail?.url ||
                  "https://via.placeholder.com/400x250?text=No+Thumbnail"
                }
                alt={mat.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{mat.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {mat.description}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  📘 {mat.subject} • {mat.category}
                </p>

                <div className="mt-3 flex justify-between">
                  <a
                    href={mat.file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View / Download
                  </a>
                  {/* <button
                    onClick={() => handleDelete(mat._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑 Delete
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
