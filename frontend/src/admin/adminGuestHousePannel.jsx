import React, { useEffect, useState } from "react";
import { getAllRequests, updateRequestStatus } from "../api/guesthouseapi.js";
import toast from "react-hot-toast";

export default function AdminGuestHousePanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await getAllRequests();
      setRequests(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    const remarks = prompt(`Enter remarks for ${status}:`);
    if (!remarks) return;

    try {
      await updateRequestStatus(id, { status, remarks });
      toast.success(`Request ${status}!`);
      fetchRequests();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Guest House Applications</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{req.name}</td>
                <td className="p-3">{req.purpose}</td>
                <td className="p-3">
                  {new Date(req.fromDate).toLocaleDateString()} →{" "}
                  {new Date(req.toDate).toLocaleDateString()}
                </td>
                <td className="p-3">{req.status}</td>
                <td className="p-3 space-x-2">
                  {req.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleAction(req._id, "Institute Verified")
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Verify
                    </button>
                  )}
                  {req.status === "Institute Verified" && (
                    <button
                      onClick={() =>
                        handleAction(req._id, "Registrar Approved")
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(req._id, "Rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
