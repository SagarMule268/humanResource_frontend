import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchEmployee();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-700 text-gray-200 flex flex-col items-center py-10">
      <h1 className="font-bold text-3xl mb-10 text-white">Employee Details</h1>

      {employee ? (
        <div className="bg-gray-900 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row w-11/12 md:w-2/3 lg:w-1/2 transition-transform hover:scale-105 duration-300">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <img
              className="rounded-xl border-2 border-gray-700 w-40 h-40 object-cover"
              src={`${employee?.userId?.profileImage}`}
              alt="Profile"
            />
          </div>

          {/* Employee Info */}
          <div className="ms-0 md:ms-8 mt-6 md:mt-0 space-y-4 text-lg">
            <p><span className="font-semibold text-gray-400">Name:</span> {employee?.userId?.name}</p>
            <p><span className="font-semibold text-gray-400">Email:</span> {employee?.userId?.email}</p>
            <p><span className="font-semibold text-gray-400">Employee ID:</span> {employee?.employeeId}</p>
            <p><span className="font-semibold text-gray-400">Salary:</span> ₹{employee?.salary}</p>
            <p><span className="font-semibold text-gray-400">DOB:</span> {new Date(employee?.dob).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-xl">Loading...</p>
      )}
    </div>
  )
}

export default View;
