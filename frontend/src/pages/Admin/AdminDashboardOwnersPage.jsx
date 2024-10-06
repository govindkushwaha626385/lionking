import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminDashboardOwners from "../../components/Admin/AdminDashboardOwners";
import { useNavigate } from "react-router-dom";

const AdminDashboardOwnersPage = () => {
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
            <AdminSideBar active={3} />
          </div>
          <AdminDashboardOwners />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOwnersPage;