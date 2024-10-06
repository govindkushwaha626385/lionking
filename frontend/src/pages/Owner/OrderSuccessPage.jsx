import React from "react";
// import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../../Assests/animations/107043-success.json";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import Footer from "../../components/Layout/Footer";

const OrderSuccessPage = () => {
  return (
    <div>
      <OwnerDashboardHeader />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h5 className="mb-9 text-[25px] text-[#000000a1]">
            Your order is successful 😍
          </h5>

          <a
            href={`/owner-dashboard`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
