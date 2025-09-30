import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaCog, FaMoneyBillAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen fixed">
      <div className="w-64 bg-gray-800 text-gray-200 shadow-md p-5 h-screen">
        <h2 className="text-2xl font-bold mb-8 text-white">Hr Resourse</h2>
        <nav className="space-y-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
            end
          >
            <FaTachometerAlt /> <span>Home</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
          >
            <FaUsers /> <span>Employees</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
          >
            <FaBuilding /> <span>Department</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
          >
            <FaCalendarAlt /> <span>Leave</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/salary"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
          >
            <FaMoneyBillAlt /> <span>Salary</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600 text-white" : "text-gray-200"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition`
            }
          >
            <FaCog /> <span>Setting</span>
          </NavLink>

          <button
            className="w-full text-left px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
