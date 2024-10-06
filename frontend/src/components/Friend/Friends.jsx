import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import whatsapp from "../../Assests/images/whatsapp.png";

const Friends = ({ setOpenFriendsList, friends }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {friends && friends.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenFriendsList(false)}
              />
            </div>
            <h5>Friends Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenFriendsList(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {friends && friends.length} Friends
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {friends &&
                  friends.map((i, index) => (
                    <CartSingle key={index} friend={i} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ friend }) => {
  //   const listing_id = data.listing_id;
  // const friend_id = friend.student_id;
  // console.log("Friend ", friend);

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBID1Qv2l9GtFuT6X24KagJ10o4IbL1zuebg&s"
          alt=""
          className="w-[80px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1 className="text-[17px] text-[#480c4f] font-Roboto">
            {friend.name}
          </h1>
          <div className="flex">
            <h4
              className={`${styles.productDiscountprice} mr-5 font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto`}
            >
              {friend.institute_name}
            </h4>
            <h4
              className={`${styles.productDiscountprice} mr-5 font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto`}
            >
              {friend.course}
            </h4>{" "}
            <div className="fixed right-3 p-3 b-3">
              <a
                href={`https://wa.me/91${friend.phone_no}?text=Hello how can I help you?`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={whatsapp} alt="chat" className="w-9 h-9" />
              </a>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Friends;
