import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({});

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.status) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`department/${id}`, department, {
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
  };

  if (loading) return <div className="text-center mt-10 text-gray-200">Loading...</div>;

  return (
    <div className='max-w-3xl mx-auto mt-10 p-8 bg-gray-800 rounded-2xl text-gray-200 shadow-lg'>
      <h1 className='text-center font-bold text-3xl mb-6'>Edit Department</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="department_name" className='block mb-1 font-medium'>Department Name</label>
          <input
            type="text"
            name='dep_name'
            id='department_name'
            value={department.dep_name || ""}
            onChange={handleChange}
            className='w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
          />
        </div>
        <div>
          <label htmlFor="description" className='block mb-1 font-medium'>Description</label>
          <textarea
            name="description"
            id="description"
            value={department.description || ""}
            onChange={handleChange}
            rows={4}
            className='w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold transition-colors'
        >
          Edit Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
