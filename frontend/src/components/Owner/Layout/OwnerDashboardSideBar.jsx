import React, { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { toast } from "react-toastify";

const OwnerDashboardSideBar = ({ active }) => {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("owner_id");
    toast.success("Logout Successfully");
    navigate("/owner-login");
  };
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to={`/owner-dashboard`} className="w-full flex items-center">
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
          to={`/owner-dashboard-listings`}
          className="w-full flex items-center"
        >
          <FiPackage size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
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
        <Link
          to={`/owner-dashboard-create-listing`}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Listing
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={`/owner-dashboard-subscriptions`}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            My Subscriptions
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={`/owner-dashboard-payments`}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            My Payments
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={`/owner-dashboard-premiums`}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Buy Premium
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={`/owner-dashboard-messages`}
          className="w-full flex items-center"
        >
          <BiMessageSquareDetail
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Owner Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={`/owner-dashboard-settings`}
          className="w-full flex items-center"
        >
          <CiSettings
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      <div
        className="w-full flex items-center p-4 cursor-pointer"
        onClick={() => setShowPopup(true)} 
      >
        <BiMessageSquareDetail size={30} color="#555" />
        <h5
          className="800px:block pl-2 text-[18px] font-[400] 
            text-[#555]"
        >
          Logout
        </h5>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to logout</p>
            <div className="flex justify-between">
              <button
                onClick={logoutHandler} // Pass the row ID to the delete handler
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)} // Close the pop-up
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboardSideBar;
