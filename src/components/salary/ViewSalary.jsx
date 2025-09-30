import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewSalary = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await axios.get(`salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success && Array.isArray(response.data.salary)) {
          setSalary(response.data.salary);
          setFilteredSalary(response.data.salary);
        } else {
          setSalary([]);
          setFilteredSalary([]);
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Failed to fetch salary records');
      }
    };

    fetchSalary();
  }, [id]);

  const handleFilter = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      setFilteredSalary(salary);
      return;
    }

    const filtered = salary.filter((sal) =>
      sal.employeeId?.employeeId?.toLowerCase().includes(query)
    );
    setFilteredSalary(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-200">
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Salary History</h1>
          <p className="text-gray-400">
            View employee salary records and payment details
          </p>
        </div>

        <div className="flex justify-end my-4">
          <input
            type="text"
            placeholder="Search by Employee ID..."
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-200 placeholder-gray-400"
            onChange={handleFilter}
          />
        </div>

        {filteredSalary.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-teal-700 text-white uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Sr No</th>
                  <th className="px-6 py-3">Emp Id</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowances</th>
                  <th className="px-6 py-3">Deductions</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalary.map((sal, index) => {
                  const base = sal.base_salary || 0;
                  const allowances = sal.allowances || 0;
                  const deductions = sal.deductions || 0;
                  const netSalary = base + allowances - deductions;

                  return (
                    <tr
                      key={sal._id || index}
                      className="bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition"
                    >
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3 font-semibold text-white">
                        {sal.employeeId?.employeeId || 'N/A'}
                      </td>
                      <td className="px-6 py-3">₹{base}</td>
                      <td className="px-6 py-3 text-green-400">+₹{allowances}</td>
                      <td className="px-6 py-3 text-red-400">-₹{deductions}</td>
                      <td className="px-6 py-3 font-bold text-teal-400">₹{netSalary}</td>
                      <td className="px-6 py-3">
                        {sal.pay_date
                          ? new Date(sal.pay_date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">
            No salary records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewSalary;
