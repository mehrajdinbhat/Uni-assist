import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import InstituteDashboard from "./pages/InstituteDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute"; // ✅ make sure path matches your folder structure

// Debugging: show route in console
function DebugRoute() {
  const location = useLocation();
  console.log("🌍 Current Route:", location.pathname);
  return null;
}

function App() {
  return (
    <Router>
      <DebugRoute />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} /> {/* fallback */}

        {/* ✅ Protected Dashboards */}
        <Route
          path="/admin/institute-dashboard"
          element={
            <AdminProtectedRoute>
              <InstituteDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/registrar-dashboard"
          element={
            <AdminProtectedRoute>
              <RegistrarDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center text-2xl text-gray-600">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
