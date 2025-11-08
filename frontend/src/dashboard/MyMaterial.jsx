import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useProducts } from "../context/AuthProvider";

function MyMaterials() {
  const { profile, loading } = useProducts();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (!loading && profile?._id) {
      const fetchMyMaterials = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4001/api/materials",
            { withCredentials: true }
          );

          // Filter by uploader ID
          const userMaterials = data.materials.filter(
            (mat) => String(mat.uploader._id) === String(profile._id)
          );

          setMaterials(userMaterials);
        } catch (error) {
          console.error("Failed to fetch materials:", error);
          toast.error("Failed to load materials");
        }
      };
      fetchMyMaterials();
    }
  }, [profile, loading]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?"))
      return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/materials/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message || "Material deleted");
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete material");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen px-4 sm:ml-64 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        📘 My Uploaded Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t uploaded any materials yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
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
                <div className="mt-3 flex justify-between">
                  <a
                    href={mat.file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View / Download
                  </a>
                  <button
                    onClick={() => handleDelete(mat._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMaterials;
