// components/SignUp.js

import React, { useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  // Individual states for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test(email))
      newErrors.email =
        "Email must be a valid @gmail.com address with only letters and numbers before '@'";
    else if (email.length < 14) newErrors.email = "Please enter valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    else if (
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z\d]/.test(password)
    )
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        // console.log("Form data submitted:", {
        //   email, 
        //   password,
        // });
        // Add your form submission logic here
        const responce = await axios.post(`${server}/admin/admin-login`, {
          email,
          password,
        });
        if (responce.data.success) {
          localStorage.setItem("admin", "true");
          toast.success(responce.data.message);
          navigate(`/admin-dashboard`);
        }else{
          toast.error(responce.data.message);
        }
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Login As Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-between text-center p-5">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
