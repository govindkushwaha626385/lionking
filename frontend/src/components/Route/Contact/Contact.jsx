// components/Contact.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../../server";
const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-72 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512295767273-acd129511b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>
      </section>

      {/* Contact Info Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Get in Touch
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Email */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 8v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-2 0l-7 5-7-5H5v10h14V8h-1zm-7 4l7-5H5l7 5z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:info@yourbrand.com" className="text-blue-600">
                  govindkushwahabusiness@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 004.29.83 1 1 0 011 1v3.34a1 1 0 01-1 1A17.57 17.57 0 013 4a1 1 0 011-1h3.34a1 1 0 011 1 11.36 11.36 0 00.83 4.29 1 1 0 01-.27 1.11l-2.2 2.2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">
                <a href="tel:+1234567890" className="text-blue-600">
                  +91 6263859670
                </a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">2 Vallabh Nagar, Indore, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Map Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Location
        </h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full border-0 rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0861165122316!2d144.95373631532144!3d-37.81621897975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xfb3f7c7e9df4d7e3!2sVictoria%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1613794735031!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

const ContactForm = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone_no, setPhone_no] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({});

  const fetchData = async (id) => {
    const responce = await axios.get(`${server}/student/${id}`);
    if (responce.data.success) {
      setStudentData(responce.data.data.student);
      // console.log("Student data : ", responce.data.data.student);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      toast.warn("Login to continue");
      navigate("/login");
    } else {
      fetchData(student_id);
      const name = studentData.name;
      const email = studentData.email;
      const phone_no = studentData.phone_no;

      const responce = await axios.post(`${server}/query/create-query`, {
        student_id,
        name,
        email,
        phone_no,
        message,
      });
      if (responce.data.success) {
        toast.success(responce.data.message);
        // setName("");
        // setEmail("");
        // setPhone_no("");
        setMessage("");
        navigate("/");
      } else {
        toast.error(responce.data.message);
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Send Us a Message
      </h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        {/* <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div> */}
        {/* <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        {/* <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="phone_no"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phone_no"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Phone Number"
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
