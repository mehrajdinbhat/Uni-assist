import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";
import DocumentModal from "../components/DocumentModel";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Fetch admin profile (to check role)
  const fetchAdminProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/admin/profile",
        { withCredentials: true }
      );
      setAdmin(data.admin);
    } catch (err) {
      console.error("Admin not logged in", err);
    }
  };

  // Fetch all guesthouse requests
  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/admin/requests",
        { withCredentials: true }
      );
      setRequests(data.data);
    } catch (err) {
      console.error("Error fetching requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
    fetchRequests();
  }, []);

  // Update request status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:4001/api/admin/requests/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filter requests based on admin role
  const filteredRequests = requests.filter((req) => {
    if (admin?.role === "registrar") {
      return req.status === "Institute Verified"; // registrar only sees verified ones
    }
    return true; // institute sees all
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Guest House Requests Dashboard
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4 border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">To</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">Guests</th>
              <th className="py-3 px-4 text-center">Document</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req) => (
              <tr
                key={req._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{req.name}</td>
                <td className="py-3 px-4">{req.email}</td>
                <td className="py-3 px-4">
                  {new Date(req.fromDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {new Date(req.toDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{req.purpose}</td>
                <td className="py-3 px-4 text-center">{req.numberOfGuests}</td>

                {/* Document viewer */}
                <td className="py-3 px-4 text-center">
                  {req.document ? (
                    <button
                      onClick={() => setSelectedDoc(req.document)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto"
                    >
                      <Eye size={18} /> View
                    </button>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>

                {/* Status */}
                <td
                  className={`py-3 px-4 font-semibold text-center ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : req.status === "Institute Verified"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {req.status}
                </td>

                {/* Action Buttons */}
                <td className="py-3 px-4 flex justify-center gap-2">
                  {/* Institute Admin verifies */}
                  {admin?.role === "institute" && req.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleStatusChange(req._id, "Institute Verified")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <CheckCircle size={16} /> Verify
                    </button>
                  )}

                  {/* Registrar Admin approves/rejects */}
                  {admin?.role === "registrar" &&
                    req.status === "Institute Verified" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "Approved")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                        >
                          <CheckCircle size={16} /> Approve
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "Rejected")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Modal */}
      {selectedDoc && (
        <DocumentModal
          docUrl={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
