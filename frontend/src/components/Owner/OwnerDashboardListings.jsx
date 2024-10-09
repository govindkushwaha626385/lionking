import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { BsPencilSquare } from "react-icons/bs";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const OwnerDashboardListings = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  const [showPopup, setShowPopup] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  if (!owner_id) {
    navigate("/owner-login");
  }
  const id = owner_id;
  const [listings, setListings] = useState([]);
  const [featuredListings, setFeaturedListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPremiumExist, setIsPremiumExist] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({});

  const fetchListings = async (id) => {
    try {
      setLoading(true);
      const responce = await axios.get(
        `${server}/listing/owner-all-listings/${id}`
      );
      if (responce.data.success) {
        setListings(responce.data.data.listings);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchFeaturedListings = async (id) => {
    try {
      setLoading(true);
      const responce = await axios.get(
        `${server}/listing/owner-all-featured-listings/${id}`
      );
      if (responce.data.success) {
        setFeaturedListing(responce.data.data.listings);
        // console.log("Featured Listings : ", featuredListings);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPremiumExist = async (id) => {
    const responce = await axios.get(
      `${server}/subscription/isActiveSubscriptionExist/${id}`
    );
    // console.log("Data : ", responce.data);
    if (responce.data.success) {
      if (responce.data.isExist) {
        setIsPremiumExist(true);
        setSubscriptionData(responce.data.data.subscription);
      }
    }
  };

  useEffect(() => {
    fetchListings(id);
    fetchFeaturedListings(id);
    checkPremiumExist(id);
  }, []);

  const markAsFeatured = async (id) => {
    if (!isPremiumExist) {
      toast.warn("Please Purchase Premium plan to make listing Featured");
    } else if (isPremiumExist && featuredListings.length === subscriptionData.maxfeatured) {
      toast.warn(
        "Limit exceded! Please upgrade your subscription plan to marke more products as featured"
      );
    } else {
      try {
        const responce = await axios.put( 
          `${server}/listing/makeAsFeatured/${id}` 
        );
        if (responce.data.success) {
          toast.success(responce.data.message);
        } else {
          toast.error("Something is wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteFromFeatured = async (id) => {
    try {
      const responce = await axios.put(
        `${server}/listing/remove-from-featured/${id}`
      );
      if (responce.data.success) {
        toast.success(responce.data.message);
      } else {
        toast.error("Something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setShowPopup(false); 
    try {
      const responce = await axios.delete(
        `${server}/listing/owner-delete-listing/${id}`
      );
      if (responce.data.success) {
        window.location.reload(true);
        toast.success(responce.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    localStorage.setItem("listing_id", id);
    navigate("/owner-dashboard-update-listing");
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
      field: "featured",
      flex: 0.8,
      minWidth: 100,
      headerName: "Featured",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {!params.row.featured ? (
              <button type="button" onClick={() => markAsFeatured(params.id)}>
                <IoStarOutline color="yellow" size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => deleteFromFeatured(params.id)}
              >
                <IoStarSharp color="yellow" size={20} />
              </button>
            )}
          </>
        );
      },
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
      field: "Update Listing",
      flex: 0.8,
      minWidth: 100,
      headerName: "Update Listing",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            
            <button type="button" onClick={() => handleUpdate(params.id)}>
              <BsPencilSquare size={20} />
            </button>
            
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
                setDeleteRowId(params.id);
                setShowPopup(true);
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
        state: item.state,
        featured: item.featured,
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

      {/* Popup should be placed outside of the loading condition */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <p className="mb-4">Are you sure you want to delete this listing</p>
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

export default OwnerDashboardListings;
