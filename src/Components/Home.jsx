import React, { useState, useEffect } from "react"; 
import NavBar from "./NavBar";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { addToPastes, updateToPastes } from "../Redux/pasteSlice"; 

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // useSearchParams() is a hook provided by React Router . It allows you to read and modify the query parameters (also known as search parameters) in the URL
  // searchParams is a URLSearchParams object it contains all the current query parameters in the URL
  // setSearchParams is the function we call to update the search parameters in the URL.When we call it , React Router updates the URL without re-loading the page
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => {
    return state.paste?.pastes; 
  });

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams("");
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((paste) => {
        return paste._id == pasteId;
      });

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {pasteId ? "✏️ Update Your Paste" : "📝 Create New Paste"}
          </h1>

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              type="text"
              placeholder="Enter Title Here"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              value={value}
              placeholder="Enter Content Here"
              onChange={(event) => {
                setValue(event.target.value);
              }}
              rows={20}
            />
          </div>

          {/* Create/Update Button */}
          <div className="flex justify-center">
            <button
              onClick={createPaste}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {pasteId ? "🔄 Update Paste" : "✨ Create My Paste"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
