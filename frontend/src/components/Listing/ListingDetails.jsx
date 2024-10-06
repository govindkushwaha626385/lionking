import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { IoPersonSharp } from "react-icons/io5";
import axios from "axios";
import { server } from "../../server";
import Ratings from "../Rating/Ratings";
import whatsapp from "../../Assests/images/whatsapp.png";
import { toast } from "react-toastify";
const ListingDetails = ({ data, reviews }) => {
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const [phone_no, setPhone_no] = useState();
  const { owner_id } = data;
  const { id } = data;
  const listing_id = id;
  const isAdded = async (s_id) => {
    try {
      const responce = await axios.get(`${server}/wishlist/isAdded`, {
        s_id,
        listing_id,
      });
      if (responce.data.success) {
        console.log("Exist : ", responce.data.isExist);
        setClick(responce.data.isExist);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const s_id = localStorage.getItem("id");
    if (s_id) {
      isAdded(s_id);
    }
  }, []);

  const removeFromWishlistHandler = async () => {
    // e.preventDefault();
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      toast.warn("Please login to remove item from wishlist");
      // navigate("/login");
    }

    const responce = await axios.delete(
      `${server}/wishlist/remove-from-wishlist`,
      { student_id, listing_id }
    );
    if (responce.data.success) {
      setClick(!click);
      toast.success(responce.data.message);
    } else {
      toast.error("Something is wrong");
    }
  };

  const addToWishlistHandler = async () => {
    // e.preventDefault();
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      toast.warn("Please login to add items in wishlist");
      // navigate("/login");
    }
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

  // console.log("Owner ID : ", owner_id);

  const ownerPhoneNumber = async (owner_id) => {
    try {
      const responce = await axios.get(`${server}/owner/${owner_id}`);
      if (responce.data.success) {
        setPhone_no(responce.data.data.owner.phone_no);
        // console.log("Phone : ", responce.data.data.owner.phone_no);
        // console.log(phone_no);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Ensure owner_id is not undefined before calling ownerPhoneNumber
    if (owner_id) {
      ownerPhoneNumber(owner_id);
    }
  }, [owner_id]);

  const handleClick = () => {
    localStorage.setItem("isStudent", owner_id);
    navigate("/owner-profile");
  };

  const handleMessageSubmit = async () => {
    const id = localStorage.getItem("id");
    if (!id) {
      toast.warn("Login to continue");
      navigate("/login");
    }

    const groupTitle = id + data.owner_id;
    const userId = id;
    const sellerId = data.owner_id;
    await axios
      .post(`${server}/conversation/create-new-conversation`, {
        groupTitle,
        userId,
        sellerId,
      })
      .then((res) => {
        navigate(`/inbox?${res.data.conversation.id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              {select === 0 ? (
                <img
                  src={`${data && data.image_public_url}`}
                  alt=""
                  className="w-[80%]"
                />
              ) : (
                <video controls className="w-[80%] h-[37%]"> 
                  <source
                    src={data && data.video_public_url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="w-full flex">
                {data && ( 
                  <>
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${
                          data.image_public_url ? data.image_public_url : null
                        }`}
                        alt=""
                        className="h-[70px] rounded overflow-hidden mr-3 mt-3"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <video
                        src={`${
                          data.video_public_url ? data.video_public_url : null
                        }`}
                        alt=""
                        className="h-[70px] rounded overflow-hidden mr-3 mt-3"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </>
                )}
                <div
                  className={`${
                    select === 1 ? "border" : "null"
                  } cursor-pointer`}
                ></div>
              </div>
            </div>
            <div className="w-full 800px:w-[50%] pt-5">
              <h1 className={`${styles.productTitle}`}>{data.name}</h1>
              <p>{data.description}</p>
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  ₹{data.discountprice}
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.price ? "₹ " + data.price : null}
                </h3>
              </div>

              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={removeFromWishlistHandler}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={addToWishlistHandler}
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center pt-8">
                <button onClick={handleClick}>
                  <div
                    className={`${styles.button} bg-[#d71f50] mt-4 mr-5 !rounded !h-11`}
                    // onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Visit Shop
                    </span>
                  </div>
                </button>

                <div
                  className={`${styles.button} bg-[rgb(100,67,209)] mt-4 !rounded !h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailsInfo
          handleClick={handleClick}
          navigate={navigate}
          data={data}
          reviews={reviews}
        />
        <br />
        <br />
      </div>

      <div className="fixed bottom-3 right-3 p-3">
        <a
          href={`https://wa.me/91${phone_no}?text=Hello how can I help you?`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsapp} alt="chat" className="w-12 h-12" />
        </a>
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({ navigate, data, reviews, handleClick }) => {
  const [active, setActive] = useState(1);
  const [name, setName] = useState("");
  const [rating, setRating] = useState();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const listing_id = id;

  const handleSubmit = async (e) => {
    const student_id = localStorage.getItem("id");
    if (!student_id) {
      navigate("/login");
    }
    e.preventDefault();
    try {
      const responce = await axios.post(`${server}/review/create-review`, {
        listing_id,
        name,
        rating,
        content,
        student_id,
      });

      if (responce.data.success) {
        // console.log(responce.data.message);
        toast.success(responce.data.message);
        setName("");
        setRating();
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Listing Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Listing Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Owner Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex justify-between">
          <div className="relative">
            <div className="w-full max-h-[45vh] flex flex-col overflow-y-scroll">
              {reviews &&
                reviews.map((item) => (
                  <div className="w-full flex my-2">
                    {/* <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                /> */}
                    <IoPersonSharp size={25} color="blue" />
                    <div className="pl-2 ">
                      <div className="w-full flex items-center">
                        <h1 className="font-[500] mr-3">{item?.name}</h1>
                        <Ratings rating={item?.rating} />
                      </div>
                      <p>{item?.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="relative">
            <div className="w-full max-h-[45vh] overflow-y-scroll bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold text-center mb-6">
                Share Experience
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name  */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your good name"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="rating"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter between 1-5"
                  />
                </div>

                {/* message */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="content"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Write Your Message"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full flex justify-center">
            {reviews.length === 0 && <h5>No Reviews have for this product!</h5>}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <button onClick={handleClick}>
              <div
                className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
              >
                <h4 className="text-white">Visit Shop</h4>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
