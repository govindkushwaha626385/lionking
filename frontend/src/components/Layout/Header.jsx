// components/Header.js

import React, { useEffect, useRef, useState } from "react";
import logo from "../../Assests/images/logo.png";
import axios from "axios";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Friends from "../Friend/Friends";
import { toast } from "react-toastify";

const Header = () => {
  const [data, setData] = useState([]);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openFriendsList, setOpenFriendsList] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ price: "", city: "", category: "" });
  const [wishlists, setWishlists] = useState([]);
  const [active, setActive] = useState(true);
  const [friends, setFriends] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/listing/all-listings`);
      if (response.data.success) {
        setData(response.data.data.listings);
        setFilteredData(response.data.data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = data.filter((listing) => {
      return (
        (!filters.price || listing.price <= filters.price) &&
        (!filters.city ||
          listing.city.toLowerCase() === filters.city.toLowerCase()) &&
        (!filters.category ||
          listing.type.toLowerCase() === filters.category.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setSearchData(filtered);
    setActive(true);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== "") {
      setActive(true);
    }

    const filteredProducts = filteredData.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  const fetchWishlist = async (student_id) => {
    const response = await axios.get(
      `${server}/wishlist/get-wishlists/${student_id}`
    );
    if (response.data.success) {
      setWishlists(response.data.data.wishlists);
    }
  };
  const fetchFriends = async (student_id) => {
    const response = await axios.get(
      `${server}/student/get-friends/${student_id}`
    );
    if (response.data.success) {
      setFriends(response.data.data.friends);
    }
  };

  useEffect(() => {
    const student_id = localStorage.getItem("id");
    if (student_id) {
      fetchWishlist(student_id);
      fetchFriends(student_id);
    }
  }, []);

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img className="h-12 w-auto" src={logo} alt="Logo" />

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-6">
            <a
              href="/all-listings"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              All Listings
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div
            className="relative w-full lg:w-[50%] max-h-[50vh] p-4"
            ref={ref}
          >
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setActive(true)}
              className="h-[40px] w-full px-4 py-2 border-[#3957db] border-[2px] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db] transition-all duration-300"
            />

            {/* Filters for price and city */}
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mt-4">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db] transition-all duration-300"
              >
                <option value="">Select Category</option>
                <option value="room-flat-apartment">Room-Flat-Apartment</option>
                <option value="cafe">Cafe</option>
                <option value="hospital">Hospital</option>
                <option value="bar">Bar</option>
                <option value="store">Store</option>
              </select>
              <select
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db] transition-all duration-300"
              >
                <option value="">Select Price</option>
                <option value="5000">Below 5000</option>
                <option value="10000">Below 10000</option>
              </select>

              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db] transition-all duration-300"
              >
                <option value="">Select City</option>
                <option value="indore">Indore</option>
                <option value="sagar">Sagar</option>
              </select>
            </div>

            <AiOutlineSearch
              size={30}
              className="absolute right-4 top-[12px] cursor-pointer"
            />

            {/* Search Results */}
            {active && searchData.length > 0 && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[50vh] overflow-y-auto">
                {searchData.map((i, index) => (
                  <Link
                    to={`/listing/${i.id}`}
                    key={index}
                    className="block transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-start p-4 hover:bg-blue-100 rounded-lg">
                      <img
                        src={i.image_public_url}
                        alt={i.title}
                        className="rounded-lg w-[70px] h-[70px] object-cover border border-gray-200"
                      />
                      <div className="flex-grow ml-4">
                        <h1 className="text-gray-800 font-bold text-lg">
                          {i.title}
                        </h1>
                        <p className="text-sm text-gray-600">
                          Price:{" "}
                          <span className="font-semibold text-blue-600">
                            ₹{i.price}
                          </span>
                        </p>
                        {i.discountprice && (
                          <p className="text-sm text-green-600">
                            Discount:{" "}
                            <span className="font-semibold">
                              ₹{i.discountprice}
                            </span>
                          </p>
                        )}
                        {/* Added state, city, area */}
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">{i.state}</span>,{" "}
                          <span className="font-medium">{i.city}</span>,{" "}
                          <span className="font-medium">{i.area}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Profile / Wishlist */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                {wishlists.length === 0 ? (
                  <AiOutlineHeart size={30} color="black" />
                ) : (
                  <AiFillHeart size={30} color="red" />
                )}
                <span className="absolute right-0 top-0 rounded-full bg-[#59c188] w-4 h-4 text-black text-[12px] leading-tight text-center">
                  {wishlists.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex} cursor-pointer`}> 
              <div
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
                onClick={() =>
                  localStorage.getItem("id")
                    ? setOpenFriendsList(true)
                    : toast.warn("please login to view your friends")
                }
              >
                Friends
              </div>
            </div>
            <a
              href={`${localStorage.getItem("id") ? "/profile" : "/login"}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Profile
            </a>
            <a
              href={`${
                localStorage.getItem("owner_id")
                  ? "/owner-dashboard"
                  : "/owner-login" 
              }`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              {localStorage.getItem("owner_id") ? "Dashboard" : "Vendor"}
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-4">
            <button className="text-gray-600 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Wishlist */}
      {openWishlist && (
        <Wishlist setOpenWishlist={setOpenWishlist} wishlists={wishlists} />
      )}
      {openFriendsList && (
        <Friends setOpenFriendsList={setOpenFriendsList} friends={friends} />
      )}
    </div>
  );
};

export default Header;

// // components/Header.js

// import React, { useEffect, useRef, useState } from "react";
// import logo from "../../Assests/images/logo.png";
// import axios from "axios";
// import { server } from "../../server";
// import { Link } from "react-router-dom";
// import { AiFillHeart, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
// import styles from "../../styles/styles";
// import Wishlist from "../Wishlist/Wishlist";

// const Header = () => {
//   const [data, setData] = useState([]);
//   const [openWishlist, setOpenWishlist] = useState(false);
//   // const [open, setOpen] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filters, setFilters] = useState({ price: "", city: "" });
//   const [wishlists, setWishlists] = useState([]);

//   const [active, setActive] = useState(true); // Initial state
//   const ref = useRef(null); // Create a reference for the component

//   useEffect(() => {
//     // Detect click outside the component
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setActive(false); // Set isActive to false when clicking outside
//       }
//     };

//     // Add event listener
//     document.addEventListener("mousedown", handleClickOutside);

//     // Cleanup event listener on component unmount
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   const fetchData = async () => {
//     try {
//       const responce = await axios.get(`${server}/listing/all-listings`);
//       if (responce.data.success) {
//         setData(responce.data.data.listings);
//         setFilteredData(responce.data.data.listings);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchData, setSearchData] = useState([]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });

//     const filtered = data.filter((listing) => {
//       return (
//         (!filters.price || listing.price <= filters.price) &&
//         (!filters.city ||
//           listing.city.toLowerCase() === filters.city.toLowerCase())
//       );
//     });
//     setFilteredData(filtered);
//   };

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     setActive(true); // Show search results when input has value

//     const filteredProducts =
//       filteredData &&
//       filteredData.filter((product) =>
//         product.title.toLowerCase().includes(term.toLowerCase())
//       );
//     setSearchData(filteredProducts);
//   };

//   const fetchWishlist = async (student_id) => {
//     const responce = await axios.get(
//       `${server}/wishlist/get-wishlists/${student_id}`
//     );
//     if (responce.data.success) {
//       // console.log("Wishlists : ", responce.data.data.wishlists);
//       setWishlists(responce.data.data.wishlists);
//     }
//   };
//   useEffect(() => {
//     const student_id = localStorage.getItem("id");
//     // console.log("Student ID ", student_id);
//     if (student_id) {
//       fetchWishlist(student_id);
//     }
//   }, []);

//   return (
//     <div>
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <img className="h-12 w-auto" src={logo} alt="" />

//           {/* Navigation Links */}
//           <nav className="hidden md:flex space-x-6">
//             <a
//               href="/all-listings"
//               className="text-gray-600 hover:text-blue-600"
//             >
//               All Listings
//             </a>
//             <a href="/" className="text-gray-600 hover:text-blue-600">
//               Home
//             </a>
//             <a href="/about" className="text-gray-600 hover:text-blue-600">
//               About
//             </a>
//             <a href="/contact" className="text-gray-600 hover:text-blue-600">
//               Contact
//             </a>
//           </nav>

//           <div
//             className="w-full lg:w-[50%] relative max-h-[50vh] p-4"
//             ref={ref}
//           >
//             <input
//               type="text"
//               placeholder="Search Product..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onFocus={() => setActive(true)}
//               className="h-[40px] w-full px-4 py-2 border-[#3957db] border-[2px] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db]"
//             />

//             {/* Filters for price and city */}
//             <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mt-4">
//               <select
//                 name="price"
//                 value={filters.price}
//                 onChange={handleFilterChange}
//                 className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db]"
//               >
//                 <option value="">Select Price</option>
//                 <option value="5000">Below 5000</option>
//                 <option value="10000">Below 10000</option>
//               </select>

//               <select
//                 name="city"
//                 value={filters.city}
//                 onChange={handleFilterChange}
//                 className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3957db]"
//               >
//                 <option value="">Select City</option>
//                 <option value="indore">Indore</option>
//                 <option value="sagar">Sagar</option>
//               </select>
//             </div>

//             <AiOutlineSearch
//               size={30}
//               className="absolute right-4 top-[12px] cursor-pointer"
//             />

//             {/* Search results */}
//             {active && searchData && searchData.length !== 0 && (
//               <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10">
//                 {searchData.map((i, index) => (
//                   <Link
//                     to={`/listing/${i.id}`}
//                     key={index}
//                     className="block hover:bg-gray-100"
//                   >
//                     <div className="flex items-start space-x-4 p-3">
//                       <img
//                         src={`${i.image_public_url}`}
//                         alt={i.title}
//                         className="rounded w-[50px] h-[50px] object-cover"
//                       />
//                       <div className="flex-grow">
//                         <h1 className="text-gray-800 font-semibold">
//                           {i.title}
//                         </h1>
//                         <p className="text-sm text-gray-600">
//                           Price: ₹{i.price}
//                         </p>
//                         {i.discountprice && (
//                           <p className="text-sm text-green-600">
//                             Discount: ₹{i.discountprice}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* User Profile / Login Button */}
//           <div className="hidden md:flex p-10 items-center space-x-4">
//             <div className={`${styles.noramlFlex}`}>
//               <div
//                 className="relative cursor-pointer mr-[15px]"
//                 onClick={() => setOpenWishlist(true)}
//               >
//                 {wishlists && wishlists.length === 0 ? (
//                   <AiOutlineHeart size={30} color="black" />
//                 ) : (
//                   <AiFillHeart size={30} color="red" />
//                 )}

//                 <span className="absolute right-0 top-0 rounded-full bg-[#59c188] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
//                   {wishlists && wishlists.length}
//                 </span>
//               </div>
//             </div>
//             <a
//               href="/login"
//               className={`${
//                 localStorage.getItem("id") ? "hidden" : "block"
//               } bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`}
//             >
//               Login
//             </a>
//             {/* <a
//                href="/sign-up"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Sign up
//             </a> */}

//             <a
//               href={`${localStorage.getItem("id") ? "/profile" : "/login"}`}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Profile
//             </a>
//             <a
//               href={`${
//                 localStorage.getItem("owner_id")
//                   ? "/owner-dashboard"
//                   : "/owner-login"
//               }`}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {localStorage.getItem("owner_id") ? "Dashboard" : "Vendor"}
//             </a>
//           </div>
//           {openWishlist ? (
//             <Wishlist setOpenWishlist={setOpenWishlist} wishlists={wishlists} />
//           ) : null}
//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button className="text-gray-600 focus:outline-none">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
