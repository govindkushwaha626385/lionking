import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import axios from "axios";
import { server } from "../../server";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";

const CategoryListings = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(
        `${server}/listing/category/${category}`
      );
      if (responce.data.success) {
        setData(responce.data.data.listings);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>All Listings of {category}</h1>
          </div>
          <div className="grid grid-cols-2 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {data && data.length !== 0 && (
              <>
                {data &&
                  data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryListings;
