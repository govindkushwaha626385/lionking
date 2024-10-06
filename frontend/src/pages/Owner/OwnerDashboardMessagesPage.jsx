import React from "react";
import OwnerDashboardHeader from "../../components/Owner/Layout/OwnerDashboardHeader";
import OwnerDashboardSideBar from "../../components/Owner/Layout/OwnerDashboardSideBar";
import OwnerDashboardMessages from "../../components/Owner/OwnerDashboardMessages";
import { useNavigate } from "react-router-dom";

const OwnerDashboardMessagesPage = () => {
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
              <OwnerDashboardSideBar active={8} />
            </div>
            <div className="w-full justify-center flex">
                <OwnerDashboardMessages/>
            </div>
          </div>
        </div>
  );
};

export default OwnerDashboardMessagesPage;