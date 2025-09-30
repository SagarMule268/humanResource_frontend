import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

const Setting = () => {
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSetting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (setting.new_password === setting.confirm_password) {
        const response = await axios.put(
          "api/setting/",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          alert("Password updated successfully");
          setSetting({
            userId: user._id,
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
        } else {
          alert(response.error);
        }
      } else {
        setError("Passwords do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-center font-bold text-2xl text-white mb-6">
          Change Password
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}
          <div>
            <label
              htmlFor="old_password"
              className="block mb-2 text-gray-300 font-semibold"
            >
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              value={setting.old_password}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new_password"
              className="block mb-2 text-gray-300 font-semibold"
            >
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              value={setting.new_password}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-gray-300 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={setting.confirm_password}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold 
                         hover:bg-teal-700 transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
