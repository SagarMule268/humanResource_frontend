import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const fecthDepartments = async () => {
    let departments;

    try {
        const response = await axios.get('department/',
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        if (response.data.success) {
            departments = response.data.departments;
        }

    } catch (error) {
        if (error.response && !error.response.data.status) {
            alert(error.response.data.error);
        }
    }
    return departments;
}


// employees for the salary form  
export const getEmployees = async (id) => {
    let employees;

    try {
        const response = await axios.get(`employee/department/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        console.log("employees fetched" , response.data.employees)
        if (response.data.success) {
            employees = response.data.employees;
        }

    } catch (error) {
        if (error.response && !error.response.data.status) {
            alert(error.response.data.error);
        }
    }
    return employees;
}



export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();


    return (
        <div className="flex space-x-3">

            <button className="px-3 py-1 rounded:md text-white bg-teal-600"
                onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >
                view</button>
             <button className="px-3 py-1 rounded:md text-white bg-yellow-600"
                onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >
                Edit</button>    
            <button className="px-3 py-1 rounded:md text-white bg-teal-600"
                onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
            >
                Salary</button>
           
            <button className="px-3 py-1 rounded:md text-white bg-red-600"
            onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}
            >Leave</button>
        </div>
    )
}

export const columns = [
    {
        name: "Sr No",
        selector: (row) => row.sno,
        sortable: true,
        with: "70px",

    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "130px"
    },
    {
        name: "Profile Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {

        name: "Department Name",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {

        name: "Dob",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },

];