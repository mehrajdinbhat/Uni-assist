import React, { useEffect, useState } from "react";
import { getUserRequests } from "../api/guesthouseapi.js";
import toast from "react-hot-toast";

export default function UserGuestHouseRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserRequests();
        setRequests(data.data);
      } catch (err) {
        toast.error("Failed to load requests");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Guest House Requests</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Letter</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{req.purpose}</td>
                  <td className="p-3">
                    {new Date(req.fromDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(req.toDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      req.status === "Registrar Approved"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="p-3">
                    {req.permissionLetter ? (
                      <a
                        href={req.permissionLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
