import React from "react";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import OwnerDashboardSideBar from "../../components/Owner/Layout/OwnerDashboardSideBar";
import { useNavigate } from "react-router-dom";
import OwnerDashboardHero from "../../components/Owner/OwnerDashboardHero";

const OwnerDashboardPage = () => {
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
              <OwnerDashboardSideBar active={1} />
            </div>
            <OwnerDashboardHero />
          </div>
        </div>
  );
};

export default OwnerDashboardPage;