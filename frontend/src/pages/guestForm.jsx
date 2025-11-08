import React, { useState } from "react";
import { submitGuestHouseForm } from "../api/guesthouseapi.js";
import toast from "react-hot-toast";

export default function GuestHouseForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fromDate: "",
    toDate: "",
    purpose: "",
    numberOfGuests: "",
  });
  const [documents, setDocuments] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setDocuments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    documents.forEach((file) => data.append("documents", file));

    try {
      const res = await submitGuestHouseForm(data);
      toast.success("Request submitted successfully!");
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Guest House Booking Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "From Date", name: "fromDate", type: "date" },
          { label: "To Date", name: "toDate", type: "date" },
          { label: "Purpose", name: "purpose", type: "text" },
          { label: "Number of Guests", name: "numberOfGuests", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Documents (PDF or Image)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
