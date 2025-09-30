import axios from '../../api/axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('department/add', department, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 p-8 bg-gray-800 rounded-2xl text-gray-200 shadow-lg'>
      <h1 className='text-center font-bold text-3xl mb-6'>Add New Department</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="dep_name" className='text-sm font-medium mb-1 block'>Department Name</label>
          <input
            type="text"
            name='dep_name'
            id='dep_name'
            onChange={handleChange}
            className='w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
          />
        </div>
        <div>
          <label htmlFor="description" className='text-sm font-medium mb-1 block'>Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            className='w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
            rows={4}
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold transition-colors'
        >
          Add New Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
