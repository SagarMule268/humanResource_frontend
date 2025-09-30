import React, { useEffect, useState } from 'react'
import { fecthDepartments, getEmployees } from '../../utils/EmployeeHelper';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const Add = () => {
    const navigate = useNavigate();
    const [departments, setDapartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [salary, setSalary] = useState({
        employeeId: null,
        base_salary: 0,
        allowances: 0,
        deductions: 0,
        pay_date: null
    });

    useEffect(() => {
        const depList = async () => {
            const departmentList = await fecthDepartments();
            setDapartments(departmentList);
        }
        depList();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prev) => ({ ...prev, [name]: value }))
    }

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`salary/add`, salary, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.data.success) navigate('/admin-dashboard/employees');
        } catch (error) {
            if (error.response && !error.response.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl shadow-lg bg-gray-800 text-gray-100">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                Add Salary
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                
                {/* Department */}
                <div className="flex flex-col">
                    <label htmlFor="department" className="mb-2 font-semibold text-gray-200">Department</label>
                    <select
                        name="department"
                        id="department"
                        onChange={handleDepartment}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>

                {/* Employee */}
                <div className="flex flex-col">
                    <label htmlFor="employee" className="mb-2 font-semibold text-gray-200">Employee</label>
                    <select
                        name="employeeId"
                        id="employee"
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>{emp.userId.name}</option>
                        ))}
                    </select>
                </div>

                {/* Base Salary */}
                <div className="flex flex-col">
                    <label htmlFor="base_salary" className="mb-2 font-semibold text-gray-200">Basic Salary</label>
                    <input
                        type="text"
                        name="base_salary"
                        id="base_salary"
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                </div>

                {/* Allowances */}
                <div className="flex flex-col">
                    <label htmlFor="allowances" className="mb-2 font-semibold text-gray-200">Allowances</label>
                    <input
                        type="text"
                        name="allowances"
                        id="allowances"
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                </div>

                {/* Deductions */}
                <div className="flex flex-col">
                    <label htmlFor="deductions" className="mb-2 font-semibold text-gray-200">Deductions</label>
                    <input
                        type="text"
                        name="deductions"
                        id="deductions"
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                </div>

                {/* Pay Date */}
                <div className="flex flex-col">
                    <label htmlFor="pay_date" className="mb-2 font-semibold text-gray-200">Pay Date</label>
                    <input
                        type="date"
                        name="pay_date"
                        id="pay_date"
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                </div>

                {/* Submit */}
                <div className="pt-4 w-full">
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add;
