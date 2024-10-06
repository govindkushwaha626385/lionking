import React from "react";
import OwnerDashboardUpdateListing from "../../components/Owner/OwnerDashboardUpdateListing";
import { useNavigate } from "react-router-dom";

const OwnerDashboardUpdateListingPage = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }
  // const id = owner_id;
  return (
    <div className="w-full justify-center h-95% flex m-16">
      <OwnerDashboardUpdateListing />
    </div>
  );
};

export default OwnerDashboardUpdateListingPage;
