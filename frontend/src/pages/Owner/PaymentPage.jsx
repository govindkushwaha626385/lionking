import React from "react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import Footer from "../../components/Layout/Footer";
// import Header from '../../components/Layout/Header'
import Payment from "../../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <OwnerDashboardHeader />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
}; 

export default PaymentPage;
