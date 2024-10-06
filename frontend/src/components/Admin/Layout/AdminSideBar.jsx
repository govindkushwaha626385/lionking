import React from "react";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { toast } from "react-toastify";

const AdminSideBar = ({ active }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("admin");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-listings"
          className="w-full flex items-center"
        >
          <BsHandbag size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Listings
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-dashboard-owners" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Owners
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-students"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Students
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-subscriptions"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Subscriptions
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-payments"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Payments
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-premiums"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Premium
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-dashboard-queries"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Queries
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      <div
        className="w-full flex items-center p-4 cursor-pointer"
        onClick={() => logoutHandler()}
      >
        <BiMessageSquareDetail size={30} color="#555" />
        <h5
          className="800px:block pl-2 text-[18px] font-[400] 
            text-[#555]"
        >
          Logout
        </h5>
      </div>
    </div>
  );
};

export default AdminSideBar;
