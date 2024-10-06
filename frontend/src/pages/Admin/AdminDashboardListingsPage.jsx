import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminDashboardListings from "../../components/Admin/AdminDashboardListings";
import { useNavigate } from "react-router-dom";

const AdminDashboardListingsPage = () => {
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
            <AdminSideBar active={2} />
          </div>
          <AdminDashboardListings />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardListingsPage;