import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import InstituteDashboard from "./pages/InstituteDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin/>} />

        {/* Role-specific dashboards */}
        <Route
          path="/admin/institute-dashboard"
          element={<InstituteDashboard />}
        />
        <Route
          path="/admin/registrar-dashboard"
          element={<RegistrarDashboard />}
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center text-2xl">Page Not Found</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
