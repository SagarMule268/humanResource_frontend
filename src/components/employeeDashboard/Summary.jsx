import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-700    p-5">
      <div className="rounded-lg flex items-center space-x-4 bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md">
        {/* Icon Section */}
        <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-6 py-4 ml-2 rounded-lg">
          <FaUser />
        </div>

        {/* Text Section */}
        <div className="pl-2 py-4 text-white">
          <p className="text-lg font-medium text-gray-400">Welcome Back</p>
          <p className="text-2xl font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
