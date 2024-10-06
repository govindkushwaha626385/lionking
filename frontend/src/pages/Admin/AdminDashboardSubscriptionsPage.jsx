import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardSubscriptions from "../../components/Admin/AdminDashboardSubscriptions";
import { useNavigate } from "react-router-dom";

const AdminDashboardSubscriptionsPage = () => {
  const navigate = useNavigate();
  const admin= localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }
  // const id = owner_id;
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AdminDashboardSubscriptions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSubscriptionsPage;