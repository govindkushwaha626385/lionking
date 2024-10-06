// components/About.js

import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-4xl md:text-6xl font-bold text-center">
          About Us
        </h1>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          Our mission is to deliver innovative solutions that empower businesses
          to achieve their goals. We are dedicated to creating products that are
          user-friendly, efficient, and impactful.
        </p>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Team Member */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1502764613149-7f1d229e2307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    John Doe
                  </h3>
                  <p className="text-gray-600 mb-4">CEO & Founder</p>
                  <p className="text-gray-600">
                    John is a visionary leader with a passion for technology and
                    innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Repeat Team Members */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Jane Smith
                  </h3>
                  <p className="text-gray-600 mb-4">Chief Technology Officer</p>
                  <p className="text-gray-600">
                    Jane leads our technology team with expertise in software
                    development.
                  </p>
                </div>
              </div>
            </div>

            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Core Values
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We strive to bring new ideas to life, constantly evolving and
                improving.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in honesty and transparency in all our interactions.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to achieving the highest standards in all our
                endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Our History
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <img
                src="https://images.unsplash.com/photo-1503437313881-cf9d1c9b68ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt="History"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                Our company was founded in 2010 with the vision of making the
                world a better place through technology. Over the years, we have
                grown into a global organization, serving clients around the
                world and constantly innovating to stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
