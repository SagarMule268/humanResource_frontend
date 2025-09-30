import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCog,
  FaMoneyBillAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 shadow-md p-5 h-screen">
        <h2 className="text-2xl font-bold mb-8 text-white">Hr Resource</h2>
        <nav className="space-y-4">
          <NavLink
            to="/employee-dashboard"
            end
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              } flex items-center space-x-2 px-3 py-2 rounded-lg transition`
            }
          >
            <FaTachometerAlt /> <span>Home</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/profile/${user?._id}`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              } flex items-center space-x-2 px-3 py-2 rounded-lg transition`
            }
          >
            <FaUsers /> <span>My Profile</span>
          </NavLink>

          <NavLink
            to="/employee-dashboard/leaves"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              } flex items-center space-x-2 px-3 py-2 rounded-lg transition`
            }
          >
            <FaCalendarAlt /> <span>Leave</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/salary/${user._id}`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              } flex items-center space-x-2 px-3 py-2 rounded-lg transition`
            }
          >
            <FaMoneyBillAlt /> <span>Salary</span>
          </NavLink>

          <NavLink
            to="/employee-dashboard/setting"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              } flex items-center space-x-2 px-3 py-2 rounded-lg transition`
            }
          >
            <FaCog /> <span>Setting</span>
          </NavLink>

          <button
            className="w-full text-left px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
