import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
// import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromWishlist } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist, wishlists }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlists && wishlists.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlists && wishlists.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlists &&
                  wishlists.map((i, index) => (
                    <CartSingle key={index} data={i} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const listing_id = data.listing_id;
  const student_id = data.student_id;
  const [listing, setListing] = useState({});

  const fetchData = async (id) => {
    try {
      const responce = await axios.get(`${server}/listing/${id}`);
      if (responce.data.success) {
        setListing(responce.data.data.listing);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(listing_id);
  }, []);

  const removeFromWishlistHandler = async () => {
    const responce = await axios.delete(
      `${server}/wishlist/remove-from-wishlist`,
      { student_id, listing_id }
    );
    if (responce.data.success) {
      toast.success(responce.data.message);
    } else {
      toast.error("Something is wrong");
    }
  };

  return (
    <Link to={`/listing/${listing.id}`}>
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={removeFromWishlistHandler}
        />
        <img
          src={`${listing.image_public_url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{listing.title}</h1>
          <div className="flex">
            <h4
              className={`${styles.price} mr-5 font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto`}
            >
              ₹ {listing.price}
            </h4>
            <h4
              className={`${styles.productDiscountPrice} font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#169536] font-Roboto`}
            >
             ₹ {listing.discountprice}
            </h4>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Wishlist;
