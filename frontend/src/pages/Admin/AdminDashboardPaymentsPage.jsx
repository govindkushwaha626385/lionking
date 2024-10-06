import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardPayments from "../../components/Admin/AdminDashboardPayments";
import { useNavigate } from "react-router-dom";

const AdminDashboardPaymentsPage = () => {
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
            <AdminSideBar active={6} />
          </div>
          <AdminDashboardPayments />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPaymentsPage;