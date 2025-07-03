import React, { useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // useSelector is a hook provided by React Redux that allows you to extract data from the Redux store state.
  // It takes a function as an argument, which receives the entire Redux store state and returns the desired piece of state.

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) => {
    return paste.title
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());
  });

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📋 All Pastes
          </h1>

          {/* Search Input */}
          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              type="search"
              placeholder="🔍 Search Here..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>

        {/* Pastes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.length > 0 ? (
            filteredData.map((paste, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                  {paste.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {paste.content.length > 100
                    ? paste.content.substring(0, 100) + "..."
                    : paste.content}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                  >
                    ✏️ Edit
                  </a>

                  <a
                    href={`/pastes/${paste?._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                  >
                    👁️ View
                  </a>

                  <button
                    onClick={() => {
                      handleDelete(paste?._id)
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                  >
                    🗑️ Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() =>{
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Link Copied to Clipboard')
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Share Link
                  </button>
                </div>

                {/* Created Date */}
                <div className="text-xs text-gray-500 border-t pt-2">
                  Created: {new Date(paste.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm
                  ? "No pastes found matching your search."
                  : "No pastes created yet."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
