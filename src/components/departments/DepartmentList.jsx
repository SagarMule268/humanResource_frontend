import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Datatable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from '../../api/axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('department/', {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map(dep => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (<DepartmentButtons _id={dep._id} onDeleteDepartment={handleDelete} />)
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.status) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = () => {
    fetchDepartments();
  };

  const filterDepartment = (e) => {
    const records = departments.filter(dep =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  const customStyles = {
    table: {
      style: {
        backgroundColor: '#2d2d2d',
        color: '#e0e0e0'
      }
    },
    headRow: {
      style: {
        backgroundColor: '#1f1f1f',
        color: '#ffffff'
      }
    },
    rows: {
      style: {
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #444',
        color: '#e0e0e0'
      }
    },
    pagination: {
      style: {
        backgroundColor: '#1f1f1f',
        color: '#ffffff'
      }
    }
  };

  return (
    <div className='p-5 bg-gray-800 min-h-screen text-gray-200'>
      <div className='text-center mb-4'>
        <h3 className='text-2xl font-bold'>Manage Department</h3>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input
          type="text"
          className='px-2 py-1 rounded bg-gray-700 border border-gray-600 text-gray-200'
          placeholder='Search By Department ....'
          onChange={filterDepartment}
        />
        <Link
          to="/admin-dashboard/add-department"
          className='px-4 py-2 rounded-2xl bg-teal-600 text-white hover:bg-teal-700'
        >
          Create New Department
        </Link>
      </div>
      <div>
        <Datatable
          columns={columns}
          data={filteredDepartments}
          pagination
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default DepartmentList;
