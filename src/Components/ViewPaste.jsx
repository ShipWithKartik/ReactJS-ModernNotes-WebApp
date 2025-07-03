import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => {
    return state.paste.pastes;
  });

  const paste = allPastes.filter((p) => {
    return p._id == id;
  })[0];

  console.log(paste);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">View Paste</h1>
          <p className="text-gray-600">View your saved paste content</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Enter Title Here"
              value={paste?.title || ""}
              disabled
              readOnly
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={paste?.content || ""}
              placeholder="Enter Content Here"
              disabled
              readOnly
              rows={20}
            />
          </div>

          {/* Paste Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>
                Paste ID:{" "}
                <span className="font-mono text-gray-700">{paste?._id}</span>
              </p>
            </div>
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              <p>
                Created:{" "}
                {paste?.createdAt
                  ? new Date(paste.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste?.content || "")
              toast.success('Copied!');
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Copy Content
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
