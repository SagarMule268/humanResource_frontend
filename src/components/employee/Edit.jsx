import React, { useEffect, useState } from 'react'
import { fecthDepartments } from '../../utils/EmployeeHelper';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        designation: "",
        department: "",
        maritalstatus: "",
        salary: 0
    });

    // Fetch departments
    useEffect(()=>{
        const getDepartments = async () =>{
            const list = await fecthDepartments();
            setDepartments(list);
        }
        getDepartments();
    },[]);

    // Fetch employee
    useEffect(()=>{
        const getEmployee = async () =>{
            try {
                const response = await axios.get(`employee/${id}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
                });
                if(response.data.success){
                    const emp = response.data.employee;
                    setEmployee({
                        name: emp.userId.name,
                        designation: emp.designation,
                        department: emp.department?._id || "",
                        maritalstatus: emp.maritalstatus,
                        salary: emp.salary
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEmployee();
    },[id]);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEmployee(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.put(`employee/${id}`, employee, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            });
            if(response.data.success){
                navigate('/admin-dashboard/employees');
            }
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold mb-8 text-center">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                    <label>Name</label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange} className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>

                {/* Marital Status */}
                <div className="flex flex-col">
                    <label>Marital Status</label>
                    <select name="maritalstatus" value={employee.maritalstatus} onChange={handleChange} className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="">Select</option>
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                        <option value="divorced">Divorced</option>
                    </select>
                </div>

                {/* Designation */}
                <div className="flex flex-col">
                    <label>Designation</label>
                    <input type="text" name="designation" value={employee.designation} onChange={handleChange} className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>

                {/* Department */}
                <div className="flex flex-col">
                    <label>Department</label>
                    <select name="department" value={employee.department} onChange={handleChange} className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>

                {/* Salary */}
                <div className="flex flex-col">
                    <label>Salary</label>
                    <input type="text" name="salary" value={employee.salary} onChange={handleChange} className="px-4 py-3 border border-gray-700   rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>

                {/* Submit */}
                <div className="col-span-full pt-4">
                    <button type="submit" className="w-full bg-teal-600 text-gray-900 py-3 rounded-lg font-semibold hover:bg-teal-500 transition">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
