import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${
                    data.image_public_url ? data.image_public_url : null
                  }`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/owner/${data.owner_id}`} className="flex">
                    <img
                      src={`${
                        data.image_public_url ? data.image_public_url : null
                      }`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.title}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h5 className={`${styles.productDiscountPrice}`}>
                    ₹{data.discountprice}
                  </h5>
                  <h4 className={`${styles.price}`}>
                    {data.price ? "₹ " + data.price : null}
                  </h4>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
