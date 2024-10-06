import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import  axios  from "axios";
import { server } from '../../../server';

const FeaturedCafeAndBars = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const responce = await axios.get(
      `${server}/listing/category/Bar`
    );
    if (responce.data.success) {
      setData(responce.data.data.listings);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Bars</h1>
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
    </div>
  );
};

export default FeaturedCafeAndBars;
