import React from "react";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import OwnerDashboardSideBar from "../../components/Owner/Layout/OwnerDashboardSideBar";
import OwnerDashboardListings from "../../components/Owner/OwnerDashboardListings";
import { useNavigate } from "react-router-dom";

const OwnerDashboardListingsPage = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }
  // const id = owner_id;
  return (
        <div>
          <OwnerDashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[120px] 800px:w-[330px]">
              <OwnerDashboardSideBar active={2} />
            </div>
            <div className="w-full justify-center flex">
                <OwnerDashboardListings />
            </div>
          </div>
        </div>
  );
};

export default OwnerDashboardListingsPage;