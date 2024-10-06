import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
// import Loader from "../Layout/Loader";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const AdminDashboardSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }

  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(
        `${server}/subscription/admin-all-subscriptions`
      );
      if (responce.data.success) {
        setSubscriptions(responce.data.data.subscriptions);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const columns = [
    { field: "id", headerName: "Subscription Id", minWidth: 150, flex: 0.7 },

    {
      field: "owner_id",
      headerName: "Owner Id",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "end_date",
      headerName: "nd EDate",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.9,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.9,
    },
  ];

  const row = [];

  subscriptions &&
    subscriptions.forEach((item) => {
      row.push({
        id: item.id,
        owner_id: item.owner_id,
        start_date: item.start_date,
        end_date: item.end_date,
        amount: item.amount,
        status : item.status 
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AdminDashboardSubscriptions;
