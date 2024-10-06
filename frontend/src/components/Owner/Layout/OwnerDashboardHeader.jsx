import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import logo from "../../../Assests/images/logo.png";

const OwnerDashboardHeader = () => {
  //   const { seller } = useSelector((state) => state.seller);
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const owner_id = localStorage.getItem("owner_id");
  // if (!owner_id) {
  //   navigate("/owner-login");
  // }
  // const id = owner_id;
  return ( 
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div> 
        <Link to={`/owner-dashboard`}>
        <img className="h-12 w-auto" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link
            to={`/owner-dashboard-listings`}
            className="800px:block hidden"
          >
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to={`/owner-dashboard-messages`}
            className="800px:block hidden"
          >
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <button type="button">
            <Link to={`/owner-profile`}>Visit Shop</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardHeader;
