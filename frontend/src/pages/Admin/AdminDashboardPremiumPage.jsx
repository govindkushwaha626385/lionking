import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminDashboardPremiums from "../../components/Admin/AdminDashboardPremiums";
import { useNavigate } from "react-router-dom";

const AdminDashboardPremiumPage = () => {
  const navigate = useNavigate();
  const admin= localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AdminDashboardPremiums />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPremiumPage;