import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import CreateProduct from "../dashboard/CreateProducts";
import { useProducts } from "../context/AuthProvider";
import MyProducts from "../dashboard/MyProducts";
import Update from "../dashboard/Update";
import MyProfile from "../dashboard/MyProfile";
import UploadMaterial from "../dashboard/UploadMaterial.jsx";
import MyMaterials from "../dashboard/MyMaterial.jsx";

function Dashboard() {
  const { profile, isAuthenticated } = useProducts();
  const [component, setComponent] = useState("My Products");

  console.log("🧭 Current Component:", component);
  console.log(profile, isAuthenticated);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {component === "create product" ? (
          <CreateProduct />
        ) : component === "Update Product" ? (
          <Update />
        ) : component === "My Profile" ? (
          <MyProfile />
        ) : component === "Upload Material" ? (
          <UploadMaterial />
        ) : component === "My Materials" ? (
          <MyMaterials />
         ) : (
          <MyProducts />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
