import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
// import Loader from "../Layout/Loader";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const AdminDashboardOwners = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }

  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(`${server}/owner/admin-all-owners`);
      if (responce.data.success) {
        // console.log("Owners :", responce.data.data.owners);
        setOwners(responce.data.data.owners);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error ", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    try {
      const responce = await axios.delete(
        `${server}/owner/admin-delete-owner/${id}`
      );
      if (responce.data.success) {
        window.location.reload(true);
        toast.success(responce.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "Owner Id", minWidth: 150, flex: 0.7 },
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
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 100,
      flex: 0.9,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 80,
      flex: 0.7,
    },
    {
      field: "area",
      headerName: "Area",
      minWidth: 80,
      flex: 0.7,
    },
    {
      field: "gali_no",
      headerName: "Gali",
      type: "number",
      minWidth: 80,
      flex: 0.7,
    },
    {
      field: "building_no",
      headerName: "Building Number",
      typr: "number",
      minWidth: 80,
      flex: 0.7,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 120,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/owner-profile}`}>
              <button type="button">Visit Shop</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button type="button"   onClick={() => {
                setDeleteRowId(params.id);
                setShowPopup(true);
              }}>
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const row = [];

  owners &&
    owners.forEach((item) => {
      row.push({
        id: item.id,
        name: item.name,
        email: item.email,
        phone_no: item.phone_no,
        state: item.state,
        city: item.city,
        area: item.area,
        gali_no: item.gali_no ? item.gali_no : null,
        building_no: item.building_no ? item.building_no : null,
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
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to delete this owner</p> 
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(deleteRowId)} // Pass the row ID to the delete handler
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)} // Close the pop-up
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardOwners;
