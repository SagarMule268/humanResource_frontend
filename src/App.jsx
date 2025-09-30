import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoute';
import RoleBaseRoute from './utils/RoleBaseRoute';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import Add from './components/employee/Add';
import List from './components/employee/List';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/ViewSalary';
import Summary from './components/employeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import Setting from './components/employeeDashboard/Setting';
import Table from './components/leave/Table';
import Detail from './components/leave/Detail';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/admin-dashboard" />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/admin-dashboard' element=

            {<PrivateRoute>
              <RoleBaseRoute requiredRoles={["Admin"]}>

                <AdminDashboard />
              </RoleBaseRoute>

            </PrivateRoute>}
          >
            <Route index element={<AdminSummary />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="department/:id" element={<EditDepartment />} />
            <Route path="employees" element={<List />} />
            <Route path="add-employee" element={<Add />} />
            <Route path="employee/:id" element={<View />} />
            <Route path="employee/edit/:id" element={<Edit />} />
            <Route path="salary" element={<AddSalary />} />
            <Route path="employee/salary/:id" element={<ViewSalary />} />
            <Route path="leaves" element={<Table />} />
            <Route path="leaves/:id" element={<Detail />} />
            <Route path="employee/leaves/:empId" element={<LeaveList />} />
            <Route path="setting" element={<Setting />} />

          </Route>
          <Route path='/employee-dashboard'
          
          element={
          <PrivateRoute>
            <RoleBaseRoute requiredRoles={["admin","employee"]}>

            <EmployeeDashboard />
            </RoleBaseRoute>
          </PrivateRoute>
          
          
          } >
            <Route index element={<Summary />} />
            <Route path='profile/:id' element={<View />} />
            <Route path="leaves" element={<LeaveList />} />
            <Route path="leaves/add-leave" element={<AddLeave />} />
            <Route path="salary/:id" element={<ViewSalary />} />
            <Route path="setting" element={<Setting />} />
            


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
