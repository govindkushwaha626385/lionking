import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
// import Loader from "../Layout/Loader";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const OwnerDashboardPayments = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }

  const [loading, setLoading] = useState(false);
  const id = owner_id;
  const [payments, setPayments] = useState([]);

  const fetchPayments = async (id) => {
    try {
      setLoading(true)
      const responce = await axios.get(
        `${server}/payment/owner-all-payments/${id}`
      );
      if (responce.data.success) {
        setPayments(responce.data.data.payments);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayments(id);
  }, []);

  const columns = [
    { field: "id", headerName: "Payment Id", minWidth: 150, flex: 0.7 },

    {
      field: "date",
      headerName: "Date",
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

  payments &&
    payments.forEach((item) => {
      row.push({
        id: item.id,
        date: item.date,
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

export default OwnerDashboardPayments;
