import { FaBuilding, FaCalendarAlt, FaCog, FaMoneyBillAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data.success) {
          setSummary(response.data);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) return <p className="text-white">Loading ......</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} title="No of Employees" figure={summary.totalEmployee} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} title="Total Department" figure={summary.totalDepartment} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillAlt />} title="Monthly Salary" figure={summary.totalSalaries} color="bg-red-600" />
      </div>

      <div className="mt-12">
        <h1 className="text-center text-2xl font-bold text-white">Leave Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard icon={<FaCalendarAlt />} title="Leave Applied" figure={summary.leaveSummary.appliedForLeave.length} color="bg-teal-600" />
          <SummaryCard icon={<FaCalendarAlt />} title="Leave Approved" figure={summary.leaveSummary.approved} color="bg-yellow-600" />
          <SummaryCard icon={<FaTachometerAlt />} title="Leave Pending" figure={summary.leaveSummary.pending} color="bg-red-600" />
          <SummaryCard icon={<FaCalendarAlt />} title="Leave Rejected" figure={summary.leaveSummary.rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
