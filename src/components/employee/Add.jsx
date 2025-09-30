import React, { useEffect, useState } from 'react';
import { fecthDepartments } from '../../utils/EmployeeHelper';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDepartment = async () => {
      const deps = await fecthDepartments();
      setDepartments(deps);
    };
    fetchDepartment();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'employee/add',
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto  p-8 rounded-2xl  shadow-lg bg-gray-900 text-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold text-gray-200">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Employee ID */}
        <div className="flex flex-col">
          <label htmlFor="emp_id" className="mb-2 font-semibold text-gray-200">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            id="emp_id"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col">
          <label htmlFor="dob" className="mb-2 font-semibold text-gray-200">Date of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label htmlFor="gender" className="mb-2 font-semibold text-gray-200">Gender</label>
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="flex flex-col">
          <label htmlFor="marital_status" className="mb-2 font-semibold text-gray-200">Marital Status</label>
          <select
            name="maritalstatus"
            id="marital_status"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        {/* Designation */}
        <div className="flex flex-col">
          <label htmlFor="designation" className="mb-2 font-semibold text-gray-200">Designation</label>
          <input
            type="text"
            name="designation"
            id="designation"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label htmlFor="department" className="mb-2 font-semibold text-gray-200">Department</label>
          <select
            name="department"
            id="department"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div className="flex flex-col">
          <label htmlFor="salary" className="mb-2 font-semibold text-gray-200">Salary</label>
          <input
            type="text"
            name="salary"
            id="salary"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-semibold text-gray-200">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 font-semibold text-gray-200">Role</label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-200">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            accept="image/*"
            className="px-4 py-3 border rounded-lg bg-gray-800 text-gray-200"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
