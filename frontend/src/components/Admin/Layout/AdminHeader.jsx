import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../../Assests/images/logo.png";

const AdminHeader = () => {

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
        <img className="h-12 w-auto" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin-dashboard-listings" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
