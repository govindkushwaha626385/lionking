import React from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const AdminDashboardPremiums = () => {
  const navigate = useNavigate();
  const admin= localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login"); 
  }
  const data = {
    title: "Business",
    price: 499,
    discountPrice: 19,
    description: "Business plan for you",
    image_url:
      "https://www.boxcast.com/hubfs/2022%20Website/Plans/Premium%20Plan/Premium_FeatureImage.jpg",
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <img
          src={`${data.image_url ? data.image_url : null}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />

        <h4 className="pb-3 font-[500]">
          {data.title.length > 40
            ? data.title.slice(0, 40) + "..."
            : data.title}
        </h4>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              ₹{data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? "₹ " + data.price : null}
            </h4>
          </div>
        </div>
        <div className="w-full py-2 items-center justify-between">
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPremiums;
