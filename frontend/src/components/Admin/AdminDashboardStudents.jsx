import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
// import Loader from "../Layout/Loader";
// import { IoStarOutline } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

const AdminDashboardStudents = () => {
  const [students, setStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");

  const [loading, setLoading] = useState(false);
  if (!admin) {
    navigate("/system-admin-login");
  }

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(`${server}/student/admin-all-students`);
      if (responce.data.success) {
        setStudents(responce.data.data.students);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const responce = await axios.delete(
        `${server}/student/admin-delete-student/${id}`
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
    { field: "id", headerName: "Student Id", minWidth: 150, flex: 0.7 },
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
      field: "institute_name",
      headerName: "Institute Name",
      minWidth: 100,
      flex: 0.9,
    },
    {
      field: "course",
      headerName: "Course",
      minWidth: 80,
      flex: 0.7,
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

  students &&
    students.forEach((item) => {
      row.push({
        id: item.id,
        name: item.name,
        email: item.email,
        phone_no: item.phone_no,
        institute_name: item.institute_name,
        course: item.course,
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
            <p className="mb-4">Are you sure you want to delete this student</p>
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

export default AdminDashboardStudents;
