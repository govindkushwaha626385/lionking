import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const status = data.status;
  const navigate = useNavigate();

  const { id } = data;
  const listing_id = id;

  const isAdded = async (s_id) => {
    const responce = await axios.get(`${server}/wishlist/isAdded`, {
      s_id,
      listing_id,
    });
    if (responce.data.success) {
      console.log("Exist : ", responce.data.isExist);
      setClick(responce.data.isExist);
    }
  };
  const s_id = localStorage.getItem("id");
  if (s_id) {
    isAdded(s_id);
  }

  const removeFromWishlistHandler = async (e) => {
    e.preventDefault();
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      toast.warn("Please login to remove item from wishlist");
      // navigate("/login");
    }

    // setClick(!click);
    const responce = await axios.delete(
      `${server}/wishlist/remove-from-wishlist`,
      { student_id, listing_id }
    );
    if (responce.data.success) {
      toast.success(responce.data.message);
      setClick(!click);
    } else {
      toast.error("Something is wrong");
    }
  };

  const addToWishlistHandler = async (e) => {
    e.preventDefault();
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      toast.warn("Please login to add item in wishlist");
      // navigate("/login");
    }
    // setClick(!click);
    const responce = await axios.post(`${server}/wishlist/add-to-wishlist`, {
      student_id,
      listing_id,
    });
    if (responce.data.success) {
      setClick(!click);
      toast.success(responce.data.message);
    } else {
      toast.error("Something is wrong");
    }
  };

  return (
    <>
      {" "}
      {status === "active" ? (
        <div className="w-full h-[370px] bg-white rounded-lg shadow-lg p-3 relative cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="flex justify-end">
            {click ? (
              <AiFillHeart
                size={22}
                className="absolute right-0 top-3 transition-colors duration-300"
                onClick={removeFromWishlistHandler}
                color="red"
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="absolute right-0 top-3 transition-colors duration-300"
                onClick={addToWishlistHandler}
                color="#333"
                title="Add to wishlist"
              />
            )}

            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-0 top-12 transition-colors duration-300"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick view"
            />
          </div>

          <Link to={`/listing/${data.id}`}>
            <img
              src={data.image_public_url || null}
              alt=""
              className="w-full h-[170px] object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <Link to={`/listing/${data.id}`}>
            <h4 className="pb-2 font-semibold text-gray-800 line-clamp-2">
              {data.title.length > 40
                ? data.title.slice(0, 40) + "..."
                : data.title}
            </h4>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center">
                <h5 className="text-[#169536] font-bold text-lg">
                  ₹{data.discountprice}
                </h5>
                {data.price && (
                  <h4 className="text-gray-500 text-lg ml-2 line-through">
                    ₹ {data.price}
                  </h4>
                )}
              </div>
            </div>
          </Link>

          {/* Open ProductDetailsCard as a fixed full-screen overlay */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-5 relative w-full max-w-2xl h-auto">
                <ProductDetailsCard setOpen={setOpen} data={data} />
                <button
                  onClick={() => setOpen(false)} 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  title="Close"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : // <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      //   <div className="flex justify-end"></div>
      //   <Link to={`/listing/${data.id}`}>
      //     <img
      //       src={`${data.image_public_url ? data.image_public_url : null}`}
      //       alt=""
      //       className="w-full h-[170px] object-contain rounded"
      //     />
      //   </Link>

      //   <Link to={`/listing/${data.id}`}>
      //     <h4 className="pb-3 font-[500]">
      //       {data.title.length > 40
      // ? data.title.slice(0, 40) + "..."
      //         : data.title}
      //     </h4>

      //     <div className="py-2 flex items-center justify-between">
      //       <div className="flex">
      //         <h5
      //           className={`${styles.productDiscountPrice} text-[17px] text-[#169536] font-Roboto`}
      //         >
      //           ₹{data.discountprice}
      //         </h5>
      //         <h4 className={`${styles.price}`}>
      //           {data.price ? "₹ " + data.price : null}
      //         </h4>
      //       </div>
      //     </div>
      //   </Link>

      //   {/* side options */}
      //   <div>
      //     {click ? (
      //       <AiFillHeart
      //         size={22}
      //         className="cursor-pointer absolute right-0 top-5"
      //         onClick={removeFromWishlistHandler}
      //         color={click ? "red" : "#333"}
      //         title="Remove from wishlist"
      //       />
      //     ) : (
      //       <AiOutlineHeart
      //         size={22}
      //         className="cursor-pointer absolute right-0 top-5"
      //         onClick={addToWishlistHandler}
      //         color={click ? "red" : "#333"}
      //         title="Add to wishlist"
      //       />
      //     )}
      //     <AiOutlineEye
      //       size={22}
      //       className="cursor-pointer absolute right-0 top-14"
      //       onClick={() => setOpen(!open)}
      //       color="#333"
      //       title="Quick view"
      //     />

      //     {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      //   </div>
      // </div>
      null}
    </>
  );
};

export default ProductCard;
