import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md border-b-2 border-blue-200">
      {" "}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              🏠 Home
            </NavLink>

            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              📋 Pastes
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
