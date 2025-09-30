import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Leave details: ", leave);

      const response = await axios.post(
        "leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Add Leave</h2>
          <p className="text-gray-400 mt-2">
            Fill in the details to submit a leave request
          </p>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Leave Type */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="leave_type"
              className="block mb-2 text-gray-300 font-semibold"
            >
              Leave Type
            </label>
            <select
              name="leave_type"
              id="leave_type"
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Leave Type</option>
              <option value="casual leave">Casual Leave</option>
              <option value="sick leave">Sick Leave</option>
              <option value="annual leave">Annual Leave</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label
              htmlFor="from_date"
              className="block mb-2 text-gray-300 font-semibold"
            >
              From Date
            </label>
            <input
              type="date"
              name="from_date"
              id="from_date"
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* To Date */}
          <div>
            <label
              htmlFor="to_date"
              className="block mb-2 text-gray-300 font-semibold"
            >
              To Date
            </label>
            <input
              type="date"
              name="to_date"
              id="to_date"
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-gray-300 font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Submit Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
