import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/products/oneproduct/${id}`,
          { withCredentials: true }
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePrev = () => {
    if (!product?.images?.length) return;
    setCurrentImage((prev) =>
      prev > 0 ? prev - 1 : product.images.length - 1
    );
  };

  const handleNext = () => {
    if (!product?.images?.length) return;
    setCurrentImage((prev) =>
      prev < product.images.length - 1 ? prev + 1 : 0
    );
  };

  const handleAddToCart = () => {
    setCart([...cart, { ...product, quantity }]);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-gray-500">
          Product not found.
        </p>
      </div>
    );
  }

  const images = product.images || [];
  const stock = product.stock ?? 0;

  return (
    <section className="container mx-auto px-6 py-10">
      <Link
        to="/products"
        className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
      >
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        {/* Image Carousel */}
        <div className="relative md:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-inner flex justify-center items-center">
          {images.length > 0 ? (
            <img
              src={images[currentImage].url}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-lg transition-all duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-[420px] text-gray-500">
              No image available
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-indigo-500 hover:text-white transition"
              >
                &#8592;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-indigo-500 hover:text-white transition"
              >
                &#8594;
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-4">
            <p className="text-indigo-600 font-semibold text-xl mb-1">
              ${product.price}
            </p>
            <p className="text-gray-500 text-sm">
              Category: {product.category}
            </p>
            <p className="text-gray-500 text-sm">
              Seller: {product.seller?.name || "Unknown"}
            </p>
            {product.seller?.phone && (
              <p className="text-gray-500 text-sm">
                Contact:{" "}
                <a
                  href={`tel:${product.seller.phone}`}
                  className="text-indigo-600 hover:underline"
                >
                  {product.seller.phone}
                </a>
              </p>
            )}
          </div>

          {/* Stock Info */}
          <p
            className={`mb-4 font-semibold ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
          </p>

          {/* Quantity */}
          {stock > 0 && (
            <div className="flex items-center mb-6 space-x-3">
              <span className="font-medium">Quantity:</span>
              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded-md p-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-yellow-400 text-black rounded-md font-semibold shadow hover:bg-yellow-500 hover:shadow-lg transition duration-200"
              disabled={stock === 0}
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold shadow hover:bg-green-600 hover:shadow-lg transition duration-200"
              disabled={stock === 0}
            >
              💸 Buy Now
            </button>

            <button
              className="px-6 py-2 bg-indigo-500 text-white rounded-md font-semibold shadow hover:bg-indigo-600 hover:shadow-lg transition duration-200"
              onClick={() => {
                if (product.seller?.phone) {
                  window.location.href = `tel:${product.seller.phone}`;
                } else {
                  toast("Contact Seller number not available!");
                }
              }}
            >
              📞 Contact Seller
            </button>
          </div>

          {/* Ratings Section */}
          <div className="mt-10 border-t pt-5">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Ratings & Reviews
            </h2>
            {product.reviews?.length > 0 ? (
              product.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 py-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <p className="font-semibold text-gray-700">{rev.user}</p>
                  <p className="text-sm text-yellow-500">⭐ {rev.rating}/5</p>
                  <p className="text-gray-600">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
