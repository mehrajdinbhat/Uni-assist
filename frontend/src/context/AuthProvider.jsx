import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
const { data } = await axios.get(
  "http://localhost:4001/api/products/getAllProducts"
);
        console.log("✅ Products fetched:", data);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Products fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
