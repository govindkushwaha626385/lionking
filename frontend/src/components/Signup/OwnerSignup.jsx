// components/SignUp.js

import React, { useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OwnerSignup = () => {
  // Individual states for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [gali_no, setGali_no] = useState();
  const [building_no, setBuilding_no] = useState();

  // State for form validation errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    if (!state) newErrors.state = "State is required";
    else if (state.length < 3) newErrors.state = "Please enter valid state";

    if (!city) newErrors.city = "City is required";
    else if (city.length < 3) newErrors.city = "Please enter valid city";

    if (!area) newErrors.area = "Area is required";
    else if (area.length < 5) newErrors.area = "Please enter valid area";

    if (gali_no) {
      if (gali_no > 20 || gali_no <= 0) newErrors.gali_no = "Please enter valid street details";
    }
    if (building_no) {
      if (building_no > 100 || building_no <= 0)
        newErrors.gali_no = "Please enter valid building details";
    }

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
          state,
          city,
          area,
          gali_no,
          building_no,
        });
        // Add your form submission logic here
        const responce = await axios.post(`${server}/owner/create-owner`, {
          name,
          email,
          password,
          phone_no,
          state,
          city,
          area,
          gali_no,
          building_no,
        });
        if (responce.data.success) {
          toast.success(responce.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setPhone_no("");
          setPhone_no("");
          setState("");
          setCity("");
          setArea("");
          setGali_no();
          setBuilding_no();
        }else{
          toast.error(responce.data.message);
          navigate("/owner-login");
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
          Sign Up As Vendor
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
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              id="instituteName"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Your City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="area"
            >
              Area
            </label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Your Area"
            />
            {errors.area && (
              <p className="text-red-500 text-sm mt-1">{errors.area}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="gali_no"
            >
              Gali
            </label>
            <input
              type="number"
              id="gali_no"
              value={gali_no}
              onChange={(e) => setGali_no(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Your Gali"
            />
            {errors.gali_no && (
              <p className="text-red-500 text-sm mt-1">{errors.gali_no}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="building_no"
            >
              Building Number
            </label>
            <input
              type="number"
              id="building_no"
              value={building_no}
              onChange={(e) => setBuilding_no(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Your Building"
            />
            {errors.building_no && (
              <p className="text-red-500 text-sm mt-1">{errors.building_no}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-between text-center p-5">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
            <Link to="/owner-login">i already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerSignup;
