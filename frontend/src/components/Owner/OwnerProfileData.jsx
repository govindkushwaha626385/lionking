import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import axios from "axios";
import { server } from "../../server";

const OwnerProfileData = ({ isOwner }) => {
  // const { id } = useParams();
  const navigate = useNavigate();
  let owner_id = "";
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

  useEffect(() => {
    fetchListings(id);
  }, []);

  const [active, setActive] = useState(1);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              {isOwner ? "Active" : ""} Listings
            </h5>
          </div>
        </div>
        <div>
          <div
            className={`${
              localStorage.getItem("owner_id") ? "block" : "hidden"
            }`}
          >
            <Link to={`/owner-dashboard`}>
              <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                <span className="text-[#fff]">Go Dashboard</span>
              </div>
            </Link>
          </div>

          {/* {isStudent && ( */}
          <div
            className={`${
              localStorage.getItem("isStudent") ? "block" : "hidden"
            }`}
          > 
            <Link to={`/`}>
              <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                <span className="text-[#fff]">Go To Home</span>
              </div>
            </Link>
          </div>
          {/* )} */}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {listings &&
            listings.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}
    </div>
  );
};

export default OwnerProfileData;
