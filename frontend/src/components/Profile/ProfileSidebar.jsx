import axios from "axios";
import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
const ProfileSidebar = ({ setActive, active }) => {
  // const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem("id");
    toast.success("Logout Successfully");
    setShowPopup1(false);
    navigate("/");
  };

  const deleteAccountHandler = async () => {
    setShowPopup(false);
    const id = localStorage.getItem("id");
    if (!id) {
      toast.error("Account not found");
      navigate("/login");
    } else {
      const responce = await axios.delete(
        `${server}/student/delete-account/${id}`
      );
      if (responce.data.success) {
        localStorage.removeItem("id");
        toast.success(responce.data.message);
        navigate("/");
      } else {
        toast.error("Account Not found");
      }
    }
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <RiLockPasswordLine size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <button
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setShowPopup1(true)}
      >
        <RiLockPasswordLine size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}
        > 
          Logout
        </span>
      </button>
      {showPopup1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to logout from your account?</p>
            <div className="flex justify-between">
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup1(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setShowPopup(true)}
      >
        <RiLockPasswordLine size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Delete Account
        </span>
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to delete you account?</p>
            <div className="flex justify-between">
              <button
                onClick={deleteAccountHandler}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div> */}
    </div>
  );
};

export default ProfileSidebar;
