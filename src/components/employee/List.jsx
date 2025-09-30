import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Datatable from 'react-data-table-component';
import axios from '../../api/axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filterdEmployee, setFilteredEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('employee/', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                className='rounded-4xl'
                width={"100px"}
                src={`http://localhost:5000/uploads/${emp.userId.profileImage}`}
                alt={emp.userId.name}
              />
            ),
            action: <EmployeeButtons _id={emp._id} />
          }));

          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.status) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };

  return (
    <div className='p-5 bg-gray-900 min-h-screen text-gray-200'>
      <div className='text-center mb-5'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input
          type="text"
          placeholder='Search By Name ...'
          className='border border-gray-700 bg-gray-800 px-2 py-0.5 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className='px-4 py-2 rounded-2xl text-white bg-teal-600 hover:bg-teal-700 transition-colors'
        >
          Add Employee
        </Link>
      </div>
      <div className='mt-5'>
        <Datatable
          columns={columns}
          data={filterdEmployee}
          pagination
          progressPending={loading}
          customStyles={{
            header: { style: { color: '#e5e7eb' } },
            headRow: { style: { backgroundColor: '#1f2937', color: '#e5e7eb' } },
            rows: { style: { backgroundColor: '#111827', color: '#e5e7eb' } },
            pagination: { style: { backgroundColor: '#1f2937', color: '#e5e7eb' } }
          }}
        />
      </div>
    </div>
  );
};

export default List;
