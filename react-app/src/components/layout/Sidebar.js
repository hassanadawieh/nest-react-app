import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBox, FaSignOutAlt, FaBars } from "react-icons/fa"; // Icon for menu toggle
import { logout } from "../../store/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Button */}
      <button
        className="lg:hidden p-4 text-primary focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed ${isOpen && "z-20"} top-0 left-0 w-64 bg-white shadow-lg h-full p-6 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex`}
      >
        <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
        <ul className="flex-grow space-y-2">
          <li>
            <Link
              to="/dashboard/products"
              className="flex items-center space-x-2 p-2 rounded hover:bg-primary hover:text-white"
            >
              <FaBox />
              <span>Products</span>
            </Link>
          </li>
          {/* Add more links here */}
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 mt-8 rounded hover:bg-primary hover:text-white text-red-500"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
