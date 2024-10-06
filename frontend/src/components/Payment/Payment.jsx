import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
// } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { server } from "../../server";
// import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.price,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    owner_id: orderData?.owner_id,
    price: orderData?.price,
    type: orderData?.type,
    maxListings: orderData?.maxListings,
    maxFeatured: orderData?.maxFeatured,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };
  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/subscription/owner-buy-subscription`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        // localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const razorPayHandler = async (e) => {
    e.preventDefault();

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      const config = { 
        headers: {
          "Content-Type": "application/json",
        },
      };
      const price = orderData?.price;
      const owner_id = orderData?.owner_id;
      const maxListings = orderData?.maxListings; 
      const maxFeatured = orderData?.maxFeatured;
      const type = orderData?.type;
      const owner_email = orderData?.owner_email;
      const owner_name = orderData?.owner_name;
      const owner_phone_no = orderData?.owner_phone_no;
      const description = orderData?.description
      const responce = await axios.post(`${server}/payment/payment-process`, {
        price,
        owner_id,
        type,
        maxListings,
        maxFeatured,
        owner_name,
        owner_phone_no,
        owner_email,
        description,
        config,
        withCredentials: true,
      });

      if (responce.data.success) {
        if (!responce || !responce.data || !responce.data.key_id) {
          console.error("API key is missing!");
          alert("Payment initialization failed: API key is missing.");
          return; // Exit if key_id is not present
        }

        // insert data into subscription table
        // const amount = price;
        // await axios.post(
        //   `${server}/subscription/owner-buy-subscription`,
        //   amount,
        //   owner_id
        // );

        console.log("Order Successfully Created");
        // console.log("Responce " + (responce.data.key_id));
        const options = {
          key: responce.data.key_id,
          amount: responce.data.amount.toString(),
          currency: "INR",
          name: responce.data.product_name,
          description: responce.data.description,
          image: "https://dummyimage.com/600x400/000/fff",
          order_id: responce.data.order_id,
          handler: function () {
            // alert("Payment Succeeded");
            window.open("/order/success", "_self");
          },
          prefill: {
            contact: responce.data.contact.toString(),
            name: responce.data.name,
            email: responce.data.email,
          },
          notes: {
            description: "Description Section",
          },
          theme: {
            color: "#2300a3",
          },
        };

        const razorpayObject = new window.Razorpay(options); // Ensure you're using window.Razorpay
        razorpayObject.on("payment.failed", function (response) {
          alert("Payment Failed");
        });
        razorpayObject.open();
        localStorage.removeItem("latestOrder");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/subscription/owner-buy-subscription`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        // toast.success("Order successful!");
        // localStorage.setItem("cartItems", JSON.stringify([]));
        // localStorage.setItem("latestOrder", JSON.stringify([]));
        // window.location.reload(true);
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            // paymentHandler={paymentHandler}
            razorPayHandler={razorPayHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  // user,
  open,
  setOpen,
  onApprove,
  createOrder,
  // paymentHandler,
  razorPayHandler, 
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div className="w-full flex">
        <div className="flex w-full pb-5 mb-2">
          <button
            type="button"
            className="text-[18px] pl-2 font-[600] text-[#000000b1] w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={razorPayHandler}
          >
            Pay with Razorpay
          </button>
        </div>
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AQfipKUnHcbG9dkc-5mwINoxP5YGilKBTbMzidpaQ0M_xyMgTf-fYsgYNOA_vWRe63U2tUOIuFqaww5z"
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Payment;
