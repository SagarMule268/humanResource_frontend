import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-white p-5">Loading ...</div>;
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-700 text-gray-200">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
       
        <div className="flex-1 p-5 ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
