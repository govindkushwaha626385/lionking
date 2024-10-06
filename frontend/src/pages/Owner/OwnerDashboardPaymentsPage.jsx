import React from "react";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import OwnerDashboardSideBar from "../../components/Owner/Layout/OwnerDashboardSideBar";
import OwnerDashboardPayments from "../../components/Owner/OwnerDashboardPayments";
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
              <OwnerDashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <OwnerDashboardPayments />
            </div>
          </div>
        </div>
  );
};

export default OwnerDashboardListingsPage;