import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const OwnerDashboardSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const [loading, setLoading] = useState(false);
  // const {id} = useParams();
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }
  const id = owner_id;

  const fetchSubscriptions = async (id) => {
    try {
      setLoading(true);
      const responce = await axios.get(
        `${server}/subscription/owner-all-subscriptions/${id}`
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
    fetchSubscriptions(id);
  }, []);

  const deactivateSubscription = async (id) => {
    try {
      const responce = await axios.put(
        `${server}/subscription/owner-deactivate-subscription/${id}`
      );
      if (responce.data.success) {
        toast.success(responce.data.message);
        window.location.reload(true);
      } else {
        toast.error("Something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "Subscription Id", minWidth: 150, flex: 0.7 },

    {
      field: "start_date",
      headerName: "Start Date",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "end_date",
      headerName: "End EDate",
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
      field: "type",
      headerName: "Type",
      minWidth: 100,
      flex: 0.9,
    },
    { field: "status1", headerName: "Status", minWidth: 100, flex: 0.7 },
    {
      field: "status2",
      headerName: "Deactivate",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <> 
            {params.row.status2 === 'active' ? (
              <button
                type="button"
                onClick={() => {
                  setDeleteRowId(params.id); 
                  setShowPopup(true);
                }}
              >
                <AiOutlineDelete size={20} />
              </button>
            ) : null}
          </>
        );
      },
    },
  ];

  const row = [];

  subscriptions &&
    subscriptions.forEach((item) => {
      row.push({
        id: item.id,
        start_date: item.start_date,
        end_date: item.end_date,
        amount: item.amount,
        type: item.type,
        status1: item.status,
        status2 : item.status, 
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
            <p className="mb-4">Are you sure you want to deactivate this subscription</p>
            <div className="flex justify-between">
              <button
                onClick={() => deactivateSubscription(deleteRowId)} // Pass the row ID to the delete handler
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

export default OwnerDashboardSubscriptions;
