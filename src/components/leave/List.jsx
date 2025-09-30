import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const List = () => {
  let sno = 1;
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const { empId } = useParams();
  const id = user.role === "admin" ? empId : user._id;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        console.log("Accepted Id for fetching : ", id);
        const response = await axios.get(
          `leave/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          console.table(response.data.leaves);
          setFilteredLeaves(response.data.leaves);
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-white">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          className="border px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Search By Name..."
        />

        {user.role === "admin" ? (
          ""
        ) : (
          <Link
            to="/employee-dashboard/leaves/add-leave"
            className="px-4 py-2 rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition"
          >
            Add Leave
          </Link>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-900 text-gray-400">
            <tr>
              <th className="px-6 py-3">Sr No</th>
              <th className="px-6 py-3">Employee Id</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From Date</th>
              <th className="px-6 py-3">To Date</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Apply Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-gray-800 border-b border-gray-600 hover:bg-gray-600 transition"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave?.employeeId?.employeeId}</td>
                <td className="px-6 py-3">{leave.leave_type}</td>
                <td className="px-6 py-3">
                  {new Date(leave.from_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.to_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.description}</td>
                <td className="px-6 py-3">
                  {new Date(leave.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 font-semibold">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
