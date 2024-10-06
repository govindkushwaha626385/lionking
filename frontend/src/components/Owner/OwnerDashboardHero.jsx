import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import Loader from "../Layout/Loader";

const OwnerDashboardHero = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }
  const [listings, setListings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = async (owner_id) => {
    try {
      const responce = await axios.get(
        `${server}/listing/owner-all-listings/${owner_id}`
      );
      if (responce.data.success) {
        // console.log(responce.data.data.listings);
        setListings(responce.data.data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPayments = async (owner_id) => {
    try {
      const responce = await axios.get(
        `${server}/payment/owner-all-payments/${owner_id}`
      );
      if (responce.data.success) {
        setPayments(responce.data.data.payments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubscriptions = async (owner_id) => {
    try {
      const responce = await axios.get(
        `${server}/subscription/owner-all-subscriptions/${owner_id}`
      );
      if (responce.data.success) {
        setSubscriptions(responce.data.data.subscriptions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchListings(owner_id);
    fetchPayments(owner_id);
    fetchSubscriptions(owner_id);
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
              <Link to="/owner-dashboard-listings">
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
              <Link to="/owner-dashboard-payments">
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
              <Link to="/owner-dashboard-subscriptions">
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

export default OwnerDashboardHero;
