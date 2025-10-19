import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/AuthProvider";

function Products() {
  const { products } = useProducts();
  const [activeImage, setActiveImage] = useState({});
  const [loading, setLoading] = useState(true);

  // Stop loading when products are fetched (even if empty)
  useEffect(() => {
    setLoading(false);
  }, [products]);

  const handlePrev = (productId, imagesLength) => {
    setActiveImage((prev) => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : imagesLength - 1,
    }));
  };

  const handleNext = (productId, imagesLength) => {
    setActiveImage((prev) => ({
      ...prev,
      [productId]: prev[productId] < imagesLength - 1 ? prev[productId] + 1 : 0,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Marketplace Products
      </h1>
      <p className="text-center mb-8">
        Browse all products available in the marketplace.
      </p>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const images = product.images || [];
            const currentIdx = activeImage[product._id] || 0;

            return (
              <div
                key={product._id}
                className="relative rounded-lg overflow-hidden shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative flex items-center justify-center bg-gray-100 h-48">
                  {images.length > 0 ? (
                    <img
                      src={images[currentIdx].url}
                      alt={`${product.name} ${currentIdx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-48 bg-gray-200 text-gray-500">
                      No image
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrev(product._id, images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow hover:bg-blue-500 hover:text-white transition"
                      >
                        &#8592;
                      </button>
                      <button
                        onClick={() => handleNext(product._id, images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow hover:bg-blue-500 hover:text-white transition"
                      >
                        &#8594;
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`inline-block w-2 h-2 rounded-full ${
                              idx === currentIdx ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-blue-600 font-bold mb-2">
                    Price: ${product.price}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Category: {product.category}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Seller: {product.seller}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
