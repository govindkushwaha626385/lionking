// components/SignUp.js

import React, { useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentSignup = () => {
  // Individual states for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [institute_name, setInstitute_name] = useState("");
  const [course, setCourse] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // State for form validation errors
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    else if (name.length < 5)
      newErrors.name = "Name must be at least 5 characters long";

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

    if (!phone_no) newErrors.phone_no = "Phone number is required";
    else if (phone_no.length < 10 || phone_no.length > 10)
      newErrors.phone_no = "Please enter valid phone number";

    if (!institute_name) newErrors.instituteName = "Institute name is required";
    else if (institute_name.length < 5)
      newErrors.instituteName =
        "Institute name must be at least 5 characters long";

    if (!course) newErrors.course = "Course is required";
    else if (course.length < 5)
      newErrors.course = "Course must be at least 5 characters long";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        // Add your form submission logic here
        const responce = await axios.post(`${server}/student/create-student`, {
          name,
          email,
          password,
          phone_no,
          institute_name,
          course,
        });
        if (responce.data.success) {
          toast.success(responce.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setPhone_no("");
          setInstitute_name("");
          setCourse("");
        } else {
          toast.error(responce.data.message);
          navigate("/login"); 
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
          Sign Up As Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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

          {/* Phone Number */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="phoneNo"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              value={phone_no}
              onChange={(e) => setPhone_no(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Phone Number"
            />
            {errors.phone_no && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_no}</p> 
            )}
          </div>

          {/* Institute Name */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="instituteName"
            >
              Institute Name
            </label>
            <input
              type="text"
              id="instituteName"
              value={institute_name}
              onChange={(e) => setInstitute_name(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Institute Name"
            />
            {errors.instituteName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.instituteName}
              </p>
            )}
          </div>

          {/* Course */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="course"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Course"
            />
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
            <Link to="/login">i already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
