import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const OwnerInfo = ({ isOwner }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  let owner_id = "";
  const navigate = useNavigate();
  if (isOwner) {
    owner_id = localStorage.getItem("owner_id");
  } else {
    owner_id = localStorage.getItem("isStudent");
  }
  if (!owner_id) {
    navigate("/owner-login");
  }
  const id = owner_id;
  const [listings, setListings] = useState([]);

  const fetchListings = async (id) => {
    try {
      const responce = await axios.get(
        `${server}/listing/owner-all-listings/${id}`
      );
      if (responce.data.success) {
        setListings(responce.data.data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (id) => {
    try {
      const responce = await axios.get(`${server}/owner/${id}`);
      if (responce.data.success) {
        setData(responce.data.data.owner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(id);
    fetchListings(id);
    setLoading(false);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("owner_id");
    toast.success("Logout Successfully");
    navigate("/owner-login");
  };

  const deleteHandler = async () => {
    const responce = await axios.delete(`${server}/owner/delete-account/${id}`);
    if (responce.data.success) {
      toast.success(responce.data.message);
      localStorage.removeItem("owner_id");
      navigate("/");
    } else {
      toast.success("Account not found");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.email}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phone_no}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">State</h5>
            <h4 className="text-[#000000a6]">{data.state}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">City</h5>
            <h4 className="text-[#000000a6]">{data.city}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{listings && listings.length}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">{data?.joinedat?.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={deleteHandler}
              >
                <span className="text-white">Delete Account</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OwnerInfo;
