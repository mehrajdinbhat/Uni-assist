import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);




  useEffect(() => {

   const fetchProfile = async () => {
     try {
       const { data } = await axios.get(
         "http://localhost:4001/api/users/myprofile",
         { withCredentials: true }
       );
       console.log("✅ Profile fetched:", data);

       setProfile(data.user || data);
       setIsAuthenticated(true);
     } catch (error) {
       console.error("❌ Profile fetch error:", error);
       setProfile(null);
       setIsAuthenticated(false);
     } finally {
       setLoading(false);
     }
   };

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
    fetchProfile();
    fetchProducts();
    
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, profile, setProfile, setProducts, isAuthenticated ,loading}}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
