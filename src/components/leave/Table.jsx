import axios from "../../api/axios";
import { useEffect, useState } from "react"
import { columns, LeaveButton } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('leave/', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) {
          const data = response.data.leaves.map((leave, index) => ({
            _id: leave._id,
            sno: index + 1,
            employeeId: leave.employeeId?.employeeId || "N/A",
            name: leave.userId?.name || "N/A",
            department: leave.employeeId?.department?.dep_name || "N/A",
            leave_type: leave.leave_type,
            days: Math.ceil(
              (new Date(leave.to_date) - new Date(leave.from_date)) / (1000 * 60 * 60 * 24)
            ),
            status: leave.status,
            action: <LeaveButton _id={leave._id} />,
          }));

          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong");
      }
    }

    fetchLeaves();
  }, [])

  const handleFilter = (e) => {
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);
  }

  const handleFilterByButton = (status) => {
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);
  }

  const customStyles = {
    header: { style: { backgroundColor: '#1f2937', color: '#f3f4f6' } },
    headRow: { style: { backgroundColor: '#111827', color: '#f3f4f6' } },
    rows: { style: { backgroundColor: '#1f2937', color: '#f3f4f6', '&:hover': { backgroundColor: '#374151' } } },
    pagination: { style: { backgroundColor: '#111827', color: '#f3f4f6' } }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h2 className="text-center font-semibold text-2xl mb-4">Manage Leaves</h2>
      <div className='flex justify-between mb-4'>
        <input
          type="text"
          className='px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-500 outline-none'
          placeholder='Search By EmpID .... '
          onChange={handleFilter}
        />
        <div>
          <button className="bg-amber-500 px-3 py-2 rounded-md mr-2 hover:bg-amber-400" onClick={() => handleFilterByButton("pending")}>Pending</button>
          <button className="bg-teal-600 px-3 py-2 rounded-md mr-2 hover:bg-teal-500" onClick={() => handleFilterByButton("approved")}>Approved</button>
          <button className="bg-red-700 px-3 py-2 rounded-md hover:bg-red-600" onClick={() => handleFilterByButton("rejected")}>Rejected</button>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <DataTable
          data={filteredLeaves}
          columns={columns}
          pagination
          customStyles={customStyles}
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default Table;
