import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/AuthProvider";

function MyProducts() {
  const { profile, loading } = useProducts(); // get profile and loading state
  const [myProducts, setMyProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch when profile is loaded
    if (!loading && profile?._id) {
      const fetchMyProducts = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4001/api/products/getAllProducts",
            { withCredentials: true }
          );

          // Make sure the seller field is a string to match profile._id
          const userProducts = data.products.filter(
            (product) => String(product.seller._id) === String(profile._id)
          );

          setMyProducts(userProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          toast.error("Failed to fetch products");
        }
      };

      fetchMyProducts();
    }
  }, [profile, loading]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(
        `http://localhost:4001/api/products/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message || "Product deleted successfully");
      setMyProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleUpdate = (id, e) => {
    e.stopPropagation();
    navigate(`/products/update/${id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen px-4 sm:ml-64 py-10">
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myProducts.length > 0 ? (
            myProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              >
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="text-xl font-semibold my-2">{product.name}</h4>
                  <p className="text-gray-600">Category: {product.category}</p>
                  <p className="text-gray-600 mt-1">Price: ${product.price}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={(e) => handleUpdate(product._id, e)}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={(e) => handleDelete(product._id, e)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not added any products yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
