import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`leave/details/${id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) setLeave(response.data.leave);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`leave/${id}`, { status }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.success) navigate('/admin-dashboard/leaves')
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  if (!leave) return <p className="text-center text-lg mt-10 text-gray-200">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-800 shadow-xl rounded-2xl text-gray-100">
      <h1 className="font-bold text-center text-3xl mb-6 text-teal-400">
        Leave Details
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="rounded-full shadow-md border w-40 h-40 object-cover border-gray-600"
            src={`http://localhost:5000/uploads/${leave?.userId?.profileImage}`}
            alt="Profile"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-3 text-gray-100">
          <p><span className="font-semibold text-teal-300">Name:</span> {leave?.userId?.name}</p>
          <p><span className="font-semibold text-teal-300">Email:</span> {leave?.userId?.email}</p>
          <p><span className="font-semibold text-teal-300">Employee ID:</span> {leave?.employeeId?.employeeId}</p>
          <p><span className="font-semibold text-teal-300">Department:</span> {leave?.employeeId?.department?.dep_name}</p>
          <p><span className="font-semibold text-teal-300">Leave Type:</span> {leave?.leave_type}</p>
          <p><span className="font-semibold text-teal-300">Reason:</span> {leave?.description}</p>
          <p><span className="font-semibold text-teal-300">Start Date:</span> {new Date(leave.from_date).toLocaleDateString()}</p>
          <p><span className="font-semibold text-teal-300">End Date:</span> {new Date(leave?.to_date).toLocaleDateString()}</p>
          <p><span className="font-semibold text-teal-300">Days:</span> {Math.ceil((new Date(leave.to_date) - new Date(leave.from_date)) / (1000 * 60 * 60 * 24))}</p>

          <div>
            {leave.status === "pending" ? (
              <div className="flex gap-6 mt-4">
                <span className='font-semibold text-gray-100'>Action</span>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
                  onClick={() => changeStatus(leave._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
                  onClick={() => changeStatus(leave._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <span
                className={`px-4 py-2 rounded-lg font-semibold shadow text-white mt-4 inline-block
                  ${leave.status === "approved" ? "bg-green-600" : "bg-red-600"}`}
              >
                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;
