// components/SignUp.js

import React, { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentSignup = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  if (!id) {
    navigate("/login");
  }
  // const id = owner_id;
  const [data, setData] = useState(null);

  const fetchData = async (id) => {
    try {
      const responce = await axios.get(`${server}/student/${id}`);
      if (responce.data.success) {
        setData(responce.data.data.student);
        console.log(responce.data.data.student);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);
  // Individual states for each input field
  const [name, setName] = useState(data && data.name);
  const [email, setEmail] = useState(data && data.email);
  const [password, setPassword] = useState("");
  const [phone_no, setPhone_no] = useState(data && data.phone_no);
  const [institute_name, setInstitute_name] = useState(
    data && data.setInstitute_name
  );
  const [course, setCourse] = useState(data && data.course);

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

    if (!phone_no) newErrors.phoneNo = "Phone number is required";
    else if (phone_no.length < 10 || phone_no.length > 10)
      newErrors.phoneNo = "Please enter valid phone number";

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
        console.log("Form data submitted:", {
          name,
          email,
          password,
          phone_no,
          institute_name,
          course,
        });
        // Add your form submission logic here
        const responce = await axios.put(
          `${server}/student/update-profile/${id}`,
          {
            name,
            email,
            password,
            phone_no,
            institute_name,
            course,
          }
        );
        if (responce.data.success) {
          toast.success(responce.data.message);
        } else {
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
          Update Profile
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
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
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
          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
