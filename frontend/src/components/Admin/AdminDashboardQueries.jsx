import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const AdminDashboardQueries = () => {
  const [queries, setQueries] = useState([]);
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");

  const [loading, setLoading] = useState(false);
  if (!admin) {
    navigate("/system-admin-login");
  }

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(`${server}/query/admin-all-queries`);
      if (responce.data.success) {
        setQueries(responce.data.data.queries);
        // console.log("Queries : ", responce.data.data.queries);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQueries();
  }, []);
  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    { field: "student_id", headerName: "Student Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.9,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "phone_no",
      headerName: "Phone Number",
      type: "number",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "message",
      headerName: "Query",
      minWidth: 180,
      flex: 1.5,
    },
  ];

  const row = [];

  queries &&
    queries.forEach((item) => {
      row.push({
        id : item.id,
        student_id: item.student_id,
        name: item.name,
        email: item.email,
        phone_no: item.phone_no,
        message: item.message,
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

export default AdminDashboardQueries;
