import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardStudents from "../../components/Admin/AdminDashboardStudents";
import { useNavigate } from "react-router-dom";

const AdminDashboardStudentsPage = () => {
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
            <AdminSideBar active={4} />
          </div>
          <AdminDashboardStudents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStudentsPage;