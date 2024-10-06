import React, { useEffect, useState } from "react";
// import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const OwnerDashboardPremium = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }

  const [ownerData, setOwnerData] = useState({});
  const id = owner_id;

  const fetchData = async (id) => {
    const responce = await axios.get(`${server}/owner/${id}`);
    if (responce.data.success) {
      setOwnerData(responce.data.data.owner);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const data = [
    {
      title: "Pro",
      price: 199,
      discountPrice: 5,
      maxListings: 10,
      maxFeatured: 5,
      description:
        "in this plan you can add up to 10 products and make up to 5 Products as Featuted",
      image_url:
        "https://primarycheckpoint.com/wp-content/uploads/2020/06/MEMBERSHIP-LOGO-1-Y-300x300.png",
    },
    {
      title: "Business",
      price: 499,
      discountPrice: 10,
      maxListings: 30,
      maxFeatured: 15,
      description:
        "in this plan you can add up to 30 products and make up to 15 Products as Featuted",
      image_url: "https://m.media-amazon.com/images/I/51BwVxswfPL.jpg",
    },
    {
      title: "Ultra",
      price: 1299,
      discountPrice: 15,
      maxListings: 100,
      maxFeatured: 100,
      description:
        "in this plan you can add up to 100 products and make up to 100 Products as Featuted",
      image_url: "https://cdn.wordart.com/media/zinnia-uploads/premium.jpg",
    },
  ];

  const handleClick = async (type) => {
    // console.log("Owner Details : ", ownerData);

    let orderData;
    if (type === "Pro") {
      orderData = {
        price: data[0].discountPrice,
        owner_id: id,
        type: data[0].title,
        description: data[0].description,
        owner_email: ownerData.email,
        owner_name : ownerData.name,
        owner_phone_no : ownerData.phone_no,
        maxListings: data[0].maxListings,
        maxFeatured: data[0].maxFeatured,
      };
    } else if (type === "Business") {
      orderData = {
        price: data[1].discountPrice,
        owner_id: id,
        type: data[1].title,
        description: data[1].description,
        owner_name : ownerData.name,
        owner_phone_no : ownerData.phone_no,
        owner_email: ownerData.email,
        maxListings: data[1].maxListings,
        maxFeatured: data[1].maxFeatured,
      };
    } else {
      orderData = {
        price: data[2].discountPrice,
        owner_id: id,
        type: data[2].title,
        description: data[2].description,
        owner_name : ownerData.name,
        owner_phone_no : ownerData.phone_no,
        owner_email: ownerData.email,
        maxListings: data[2].maxListings,
        maxFeatured: data[2].maxFeatured,
      };
    }

    const responce = await axios.get(
      `${server}/subscription/isActiveSubscriptionExist/${id}`
    );
    // console.log("Data : ", responce.data);
    if (responce.data.success) {
      if (responce.data.isExist) {
        toast.warn("Please deActivate previous plan to Purchase new Plan");
      } else {
        localStorage.setItem("latestOrder", JSON.stringify(orderData));
        navigate("/payment");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* First card */}
          <div className="w-full h-auto bg-white rounded-lg shadow-sm p-5 relative cursor-pointer">
            <div className="flex justify-end"></div>

            {/* Image */}
            <img
              src={data[0].image_url}
              alt=""
              className="w-full h-[200px] object-contain"
            />

            {/* Title */}
            <h4 className="pb-3 font-[500] text-center">
              {data[0].title.length > 40
                ? data[0].title.slice(0, 40) + "..."
                : data[0].title}
            </h4>

            {/* Prices */}
            <div className="py-2 flex items-center justify-center space-x-4">
              <h5 className="text-lg font-bold text-red-500">
                ₹{data[0].discountPrice}
              </h5>
              <h4 className="text-gray-500 line-through">₹{data[0].price}</h4>
            </div>

            {/* Description */}
            <div className="w-full py-2 text-center">
              <p>{data[0].description}</p>
            </div>

            {/* Max Listings & Max Featured */}
            <div className="w-full py-2 text-center">
              <h5>Max Listings: {data[0].maxListings}</h5>
              <h5>Max Featured: {data[0].maxFeatured}</h5>
            </div>

            {/* Select Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={() => handleClick(data[0].title)}
              >
                Select
              </button>
            </div>
          </div>

          {/* Second card */}
          <div className="w-full h-auto bg-white rounded-lg shadow-sm p-5 relative cursor-pointer">
            <div className="flex justify-end"></div>

            {/* Image */}
            <img
              src={data[1].image_url}
              alt=""
              className="w-full h-[200px] object-contain"
            />

            {/* Title */}
            <h4 className="pb-3 font-[500] text-center">
              {data[1].title.length > 40
                ? data[1].title.slice(0, 40) + "..."
                : data[1].title}
            </h4>

            {/* Prices */}
            <div className="py-2 flex items-center justify-center space-x-4">
              <h5 className="text-lg font-bold text-red-500">
                ₹{data[1].discountPrice}
              </h5>
              <h4 className="text-gray-500 line-through">₹{data[1].price}</h4>
            </div>

            {/* Description */}
            <div className="w-full py-2 text-center">
              <p>{data[1].description}</p>
            </div>

            {/* Max Listings & Max Featured */}
            <div className="w-full py-2 text-center">
              <h5>Max Listings: {data[1].maxListings}</h5>
              <h5>Max Featured: {data[1].maxFeatured}</h5>
            </div>

            {/* Select Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={() => handleClick(data[1].title)}
              >
                Select
              </button>
            </div>
          </div>

          {/* Third Card  */}
          <div className="w-full h-auto bg-white rounded-lg shadow-sm p-5 relative cursor-pointer">
            <div className="flex justify-end"></div>

            {/* Image */}
            <img
              src={data[2].image_url}
              alt=""
              className="w-full h-[200px] object-contain"
            />

            {/* Title */}
            <h4 className="pb-3 font-[500] text-center">
              {data[2].title.length > 40
                ? data[2].title.slice(0, 40) + "..."
                : data[2].title}
            </h4>

            {/* Prices */}
            <div className="py-2 flex items-center justify-center space-x-4">
              <h5 className="text-lg font-bold text-red-500">
                ₹{data[2].discountPrice}
              </h5>
              <h4 className="text-gray-500 line-through">₹{data[2].price}</h4>
            </div>

            {/* Description */}
            <div className="w-full py-2 text-center">
              <p>{data[2].description}</p>
            </div>

            {/* Max Listings & Max Featured */}
            <div className="w-full py-2 text-center">
              <h5>Max Listings: {data[2].maxListings}</h5>
              <h5>Max Featured: {data[2].maxFeatured}</h5>
            </div>

            {/* Select Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={() => handleClick(data[2].title)}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboardPremium;
