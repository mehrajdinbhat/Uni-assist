import React from "react";
import { X } from "lucide-react";

const DocumentModal = ({ docUrl, onClose }) => {
  const isPdf = docUrl?.endsWith(".pdf");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[80%] max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Submitted Document</h2>

        {isPdf ? (
          <iframe
            src={docUrl}
            className="w-full h-[500px] rounded-md border"
            title="User Document"
          />
        ) : (
          <img
            src={docUrl}
            alt="Uploaded Document"
            className="w-full h-auto rounded-md shadow"
          />
        )}
      </div>
    </div>
  );
};

export default DocumentModal;
