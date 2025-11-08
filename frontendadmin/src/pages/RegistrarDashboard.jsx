import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Loader2, Eye } from "lucide-react";
import DocumentModal from "../components/DocumentModel";

const RegistrarDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/admin/requests",
        {
          withCredentials: true,
        }
      );
      // only show institute verified
      const verified = data.data.filter(
        (r) => r.status === "Institute Verified"
      );
      setRequests(verified);
    } catch (err) {
      console.error("Error fetching requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(
        `http://localhost:4001/api/admin/requests/${id}/status`,
        { status: action },
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Registrar Dashboard
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Purpose</th>
              <th className="p-3 text-center">Document</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{req.name}</td>
                <td className="p-3">{req.email}</td>
                <td className="p-3">{req.purpose}</td>
                <td className="p-3 text-center">
                  {req.document ? (
                    <button
                      onClick={() => setSelectedDoc(req.document)}
                      className="text-blue-600 hover:underline"
                    >
                      <Eye size={16} /> View
                    </button>
                  ) : (
                    "No Doc"
                  )}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleAction(req._id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDoc && (
        <DocumentModal
          docUrl={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};

export default RegistrarDashboard;
