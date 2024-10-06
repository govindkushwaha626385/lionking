import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import Loader from "../Layout/Loader";
// import Loader from "../Layout/Loader";

const AdminDashboardMain = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }
  const [balance, setBalance] = useState();
  const [listings, setListings] = useState([]);
  const [owners, setOwners] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminEarning = async () => {
    try {
      const responce = await axios.get(`${server}/admin/admin-earning`);
      if (responce.data.success) {
        const amount = responce.data.data.amount;
        setBalance(amount.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListings = async () => {
    try {
      const responce = await axios.get(`${server}/listing/admin-all-listings`);
      if (responce.data.success) {
        console.log(responce.data.data.listings);
        setListings(responce.data.data.listings);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchOwners = async () => { 
    try {
      const responce = await axios.get(`${server}/owner/admin-all-owners`);
      if (responce.data.success) {
        setOwners(responce.data.data.owners);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const responce = await axios.get(`${server}/student/admin-all-students`);
      if (responce.data.success) {
        setStudents(responce.data.data.students);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchPayments = async () => {
    try {
      const responce = await axios.get(`${server}/payment/admin-all-payments`);
      if (responce.data.success) {
        setPayments(responce.data.data.payments);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchSubscriptions = async () => {
    try {
      const responce = await axios.get(
        `${server}/subscription/admin-all-subscriptions`
      );
      if (responce.data.success) {
        setSubscriptions(responce.data.data.subscriptions);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    adminEarning();
    fetchListings();
    fetchOwners();
    fetchStudents();
    fetchPayments();
    fetchSubscriptions();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className=""></div>
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                ₹ {balance}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Owners
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {owners && owners.length}
              </h5>
              <Link to="/admin-dashboard-owners">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Owners</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Students
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {students && students.length}
              </h5>
              <Link to="/admin-dashboard-students">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Students</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Listings
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {listings && listings.length}
              </h5>
              <Link to="/admin-dashboard-listings">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Listings</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Payments
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {payments && payments.length}
              </h5>
              <Link to="/admin-dashboard-payments">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Payments</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Subscriptions
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {subscriptions && subscriptions.length}
              </h5>
              <Link to="/admin-dashboard-subscriptions">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Subscriptions</h5>
              </Link>
            </div>
          </div>

          <br />
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
