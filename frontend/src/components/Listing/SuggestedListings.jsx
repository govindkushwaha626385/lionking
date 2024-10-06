import React, { useEffect, useState } from "react";
// import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import axios from "axios";
import { server } from "../../server";

const SuggestedListings = ({ type }) => {
  const [listings, setListings] = useState([]);
  console.log("Type ", type); 

  const fetchData = async (type) => {
    try {
      const responce = await axios.get(`${server}/listing/category/${type}`);
      if (responce.data.success) {
        setListings(responce.data.data.listings);
        // console.log("Listings ", responce.data.data.listings);  
      } 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(type);
  }, []);

  return (
    <div>
      {listings ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Listings
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {listings &&
              listings.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedListings;
