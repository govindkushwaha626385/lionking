import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { BsPencilSquare } from "react-icons/bs";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
// import Loader from "../Layout/Loader";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

const AdminDashboardListings = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  if (!admin) {
    navigate("/system-admin-login");
  }
  const [listings, setListings] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [deleteRowId1, setDeleteRowId1] = useState(null);
  const [showPopup2, setShowPopup2] = useState(false);
  const [deleteRowId2, setDeleteRowId2] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(`${server}/listing/admin-all-listings`);
      if (responce.data.success) {
        setListings(responce.data.data.listings);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);
  const handleDelete = async (id) => {
    try {
      const responce = await axios.delete(
        `${server}/listing/admin-delete-listing/${id}`
      );
      if (responce.data.success) {
        window.location.reload(true);
        toast.success(responce.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLisintgStatus = async (id) => {
    try {
      const responce = await axios.put(
        `${server}/listing/admin-verify-listing`,
        { id }
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
    { field: "id", headerName: "Listing Id", minWidth: 150, flex: 0.7 },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "discountPrice",
      headerName: "Discount Price",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "priceDetails",
      headerName: "Price Details",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "",
      flex: 0.8,
      minWidth: 120,
      headerName: "Update Status",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              type="button"
              onClick={() => { 
                setDeleteRowId2(params.id);
                setShowPopup2(true);
              }}
            >
              <BsPencilSquare size={20} />
            </button>
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "area",
      headerName: "Area",
      minWidth: 90,
      flex: 0.6,
    },
    {
      field: "gali_no",
      headerName: "Gali_no",
      type: "number",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "building_no",
      headerName: "Building_no",
      type: "number",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "featured",
      flex: 0.8,
      minWidth: 100,
      headerName: "Featured",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {!params.row.featured ? (
              <button type="button">
                <IoStarOutline color="yellow" size={20} />
              </button>
            ) : (
              <button type="button">
                <IoStarSharp color="yellow" size={20} />
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/listing/${params.id}`}>
              <button type="button">
                <AiOutlineEye size={20} />
              </button>
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
            <button
              type="button"
              onClick={() => {
                setDeleteRowId1(params.id);
                setShowPopup1(true);
              }}
            >
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const row = [];

  listings &&
    listings.forEach((item) => {
      row.push({
        id: item.id,
        title: item.title,
        type: item.type,
        price: "₹ " + item.price,
        description: item.description,
        discountPrice: item.discountprice,
        priceDetails: item.pricedetails,
        status: item.status,
        featured: item.featured,
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
      {showPopup1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to delete this listing</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(deleteRowId1)} // Pass the row ID to the delete handler
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup1(false)} // Close the pop-up
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to change status of this listing</p>
            <div className="flex justify-between">
              <button
                onClick={() => updateLisintgStatus(deleteRowId2)} // Pass the row ID to the delete handler
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup2(false)} // Close the pop-up
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

export default AdminDashboardListings;
