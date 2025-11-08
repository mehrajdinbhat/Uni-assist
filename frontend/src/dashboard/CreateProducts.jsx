import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productImagePreviews, setProductImagePreviews] = useState([]);

  const changePhotoHandler = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setProductImagePreviews(previews);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    productImages.forEach((image) => formData.append("images", image));

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/products/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Product created successfully!");
      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setProductImages([]);
      setProductImagePreviews([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl ml-0 sm:ml-80 px-4 py-6 border rounded-lg shadow-lg bg-white">
        <h3 className="text-2xl font-semibold mb-8">Create Product</h3>
        <form onSubmit={handleCreateProduct} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Beauty">Beauty</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-lg">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-lg">Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="block text-lg">Product Images</label>
            <div className="flex flex-wrap gap-4 mb-2">
              {productImagePreviews.length > 0 ? (
                productImagePreviews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview"
                    className="w-32 h-32 rounded-md object-cover border"
                  />
                ))
              ) : (
                <img
                  src="/imgPL.webp"
                  alt="Placeholder"
                  className="w-40 h-40 rounded-md object-cover border"
                />
              )}
            </div>
            <input
              type="file"
              multiple
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-lg">Description</label>
            <textarea
              rows="5"
              placeholder="Write something about the product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
