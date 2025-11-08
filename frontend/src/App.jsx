import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Products from "./pages/products";
import { Toaster } from "react-hot-toast";
import { useProducts } from "./context/AuthProvider";
import ProductDetail from "./pages/detail";
import UploadMaterial from "./dashboard/UploadMaterial";
import Materials from "./pages/material";
import GuestHouseForm from "./pages/guestForm";
import UserGuestHouseRequests from "./dashboard/GuestHouse";
import AdminGuestHousePanel from "./admin/adminGuestHousePannel";

function App() {
  const { products } = useProducts();
  console.log(products);

  const location = useLocation();

  // Hide navbar and footer for MyAccount page
  const hideLayout = location.pathname.startsWith("/myaccount");

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/myaccount/*" element={<MyAccount />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/guesthouse/apply" element={<GuestHouseForm/>} />
        <Route path="/guesthouse/myrequests" element={<UserGuestHouseRequests/>}/>
        <Route path="/admin/guesthouse" element={<AdminGuestHousePanel />} />
      </Routes>
      {!hideLayout && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
